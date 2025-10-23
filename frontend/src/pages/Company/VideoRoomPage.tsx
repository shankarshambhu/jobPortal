import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    Button,
    Slider,
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Chip,
    alpha,
    useTheme,
    CircularProgress,
} from "@mui/material";
import {
    Mic,
    MicOff,
    CallEnd,
    VolumeUp,
    VolumeDown,
    VolumeOff,
    Send,
    Videocam,
    Person,
    DoneAll,
} from "@mui/icons-material";
import { finishInterview, sendInterviewNotes } from "../../services/interview";
import { toast } from "react-toastify";

const VideoRoomPage = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const theme = useTheme();
    const { user } = useAuth();

    const [notes, setNotes] = useState("");
    const [volume, setVolume] = useState(1);
    const [micEnabled, setMicEnabled] = useState(true);
    const [connected, setConnected] = useState(false);
    const [isSendingNotes, setIsSendingNotes] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);
    const [finished, setFinished] = useState(false);

    // ----------------- HANDLERS -----------------
    const handleNotes = async () => {
        if (!notes.trim()) {
            toast.warning("Please enter some notes before sending");
            return;
        }
        setIsSendingNotes(true);
        try {
            const res = await sendInterviewNotes(roomId!, notes);
            if (res.data.success) {
                toast.success(res.data.message);
                setNotes("");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Error sending notes");
        } finally {
            setIsSendingNotes(false);
        }
    };

    const handleFinishInterview = async () => {
        if (finished) return toast.info("Interview already finished");
        setIsFinishing(true);
        try {
            const res = await finishInterview(roomId!);
            if (res.data.success) {
                toast.success("Interview marked as finished");
                setFinished(true);
                setConnected(false);
                handleHangUp();
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to finish interview");
        } finally {
            setIsFinishing(false);
        }
    };

    const handleHangUp = () => {
        setConnected(false);
        if (localStreamRef.current) localStreamRef.current.getTracks().forEach(t => t.stop());
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
        if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
        if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
        toast.info("Call ended");
    };

    const toggleMic = () => {
        if (!localStreamRef.current) return;
        localStreamRef.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
        setMicEnabled(prev => {
            toast.info(prev ? "Microphone muted" : "Microphone unmuted");
            return !prev;
        });
    };

    // ----------------- WEBRTC + WEBSOCKET -----------------
    useEffect(() => {
        if (!roomId) return;

        let pc: RTCPeerConnection;
        let ws: WebSocket;

        const init = async () => {
            pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
            pcRef.current = pc;

            // Handle remote track
            pc.ontrack = (event) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                    remoteVideoRef.current.muted = false;
                    remoteVideoRef.current.play().catch(() => { });
                }
            };

            // Get local media
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localStreamRef.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                    localVideoRef.current.muted = true; // mute self
                    localVideoRef.current.play();
                }
                stream.getTracks().forEach(track => pc.addTrack(track, stream));
            } catch (err) {
                console.error(err);
                toast.error("Failed to access camera or microphone");
                return;
            }

            // Setup WebSocket
            const backendURL = import.meta.env.VITE_BASE_URL;
            const wsProtocol = backendURL.startsWith("https://") ? "wss://" : "ws://";
            const wsHost = backendURL.replace(/^https?:\/\//, "");
            ws = new WebSocket(`${wsProtocol}${wsHost}/video/room/${roomId}`);
            wsRef.current = ws;

            const messageQueue: any[] = [];
            const sendMessage = (msg: any) => {
                if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
                else messageQueue.push(msg);
            };

            ws.onopen = () => {
                setConnected(true);
                messageQueue.forEach(msg => ws.send(JSON.stringify(msg)));
                messageQueue.length = 0;
            };

            ws.onmessage = async (msg) => {
                const data = JSON.parse(msg.data);
                if (data.sdp) {
                    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
                    if (data.sdp.type === "offer") {
                        const answer = await pc.createAnswer();
                        await pc.setLocalDescription(answer);
                        sendMessage({ sdp: answer });
                    }
                }
                if (data.candidate) {
                    try { await pc.addIceCandidate(new RTCIceCandidate(data.candidate)); }
                    catch (e) { console.error(e); }
                }
            };

            pc.onicecandidate = (event) => {
                if (event.candidate) sendMessage({ candidate: event.candidate });
            };

            pc.onnegotiationneeded = async () => {
                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    sendMessage({ sdp: offer });
                } catch (err) {
                    console.error(err);
                }
            };
        };

        init();

        return () => {
            if (pc) pc.close();
            if (ws) ws.close();
            if (localStreamRef.current) localStreamRef.current.getTracks().forEach(t => t.stop());
        };
    }, [roomId]);

    // Volume control
    useEffect(() => {
        if (remoteVideoRef.current) remoteVideoRef.current.volume = volume;
    }, [volume]);

    return (
        <Box sx={{ padding: 3, minHeight: "100vh", background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`, display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Header */}
            <Card sx={{ width: "100%", maxWidth: 1200, mb: 3, borderRadius: 3, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)", border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                            <Typography variant="h4" fontWeight="bold" sx={{ background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", mb: 1 }}>
                                Video Interview
                            </Typography>
                            <Typography variant="body1" color="text.secondary">Room ID: {roomId}</Typography>
                        </Box>
                        <Chip icon={connected ? <Videocam /> : <CallEnd />} label={finished ? "Finished" : connected ? "Connected" : "Disconnected"} color={finished ? "default" : connected ? "success" : "error"} variant="filled" sx={{ fontWeight: 600 }} />
                    </Box>
                </CardContent>
            </Card>

            {/* Video Grid */}
            <Box sx={{ display: "flex", gap: 3, width: "100%", maxWidth: 1200, mb: 3, flexDirection: { xs: "column", md: "row" } }}>
                <Card sx={{ flex: 1, borderRadius: 3, overflow: "hidden" }}>
                    <CardContent sx={{ p: 0, position: "relative" }}>
                        <Typography variant="h6" sx={{ position: "absolute", top: 16, left: 16, background: alpha(theme.palette.background.paper, 0.8), px: 2, py: 1, borderRadius: 2, zIndex: 1, display: "flex", alignItems: "center" }}><Person sx={{ mr: 1 }} /> You</Typography>
                        <video ref={localVideoRef} autoPlay muted playsInline style={{ width: "100%", height: 300, objectFit: "cover" }} />
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1, borderRadius: 3, overflow: "hidden" }}>
                    <CardContent sx={{ p: 0, position: "relative" }}>
                        <Typography variant="h6" sx={{ position: "absolute", top: 16, left: 16, background: alpha(theme.palette.background.paper, 0.8), px: 2, py: 1, borderRadius: 2, zIndex: 1, display: "flex", alignItems: "center" }}><Person sx={{ mr: 1 }} /> Candidate</Typography>
                        <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "100%", height: 300, objectFit: "cover" }} />
                    </CardContent>
                </Card>
            </Box>

            {/* Controls */}
            <Card sx={{ width: "100%", maxWidth: 1200, mb: 3, borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                        <Button variant={micEnabled ? "contained" : "outlined"} color={micEnabled ? "primary" : "error"} startIcon={micEnabled ? <Mic /> : <MicOff />} onClick={toggleMic} disabled={!connected} sx={{ borderRadius: 3, px: 3, py: 1.5, fontWeight: "bold", minWidth: 140 }}>{micEnabled ? "Mute" : "Unmute"}</Button>
                        <Button variant="contained" color="error" startIcon={<CallEnd />} onClick={handleHangUp} disabled={!connected} sx={{ borderRadius: 3, px: 3, py: 1.5, fontWeight: "bold", minWidth: 140 }}>End Call</Button>
                        {user?.role === "company" && (
                            <Button variant="contained" color="success" startIcon={isFinishing ? <CircularProgress size={16} color="inherit" /> : <DoneAll />} onClick={handleFinishInterview} disabled={!connected || isFinishing || finished} sx={{ borderRadius: 3, px: 3, py: 1.5, fontWeight: "bold", minWidth: 180 }}>
                                {isFinishing ? "Finishing..." : finished ? "Finished" : "Finish Interview"}
                            </Button>
                        )}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto", minWidth: 200 }}>
                            <VolumeDown color="action" />
                            <Slider value={volume} min={0} max={1} step={0.1} onChange={(_, value) => setVolume(value as number)} disabled={!connected} sx={{ color: theme.palette.primary.main }} />
                            <VolumeUp color="action" />
                            <Button variant="outlined" color="secondary" onClick={() => setVolume(volume === 0 ? 1 : 0)} disabled={!connected} startIcon={volume === 0 ? <VolumeOff /> : <VolumeUp />} sx={{ borderRadius: 3 }}>{volume === 0 ? "Unmute Remote" : "Mute Remote"}</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Notes */}
            {user?.role === "company" && connected && !finished && (
                <Card sx={{ width: "100%", maxWidth: 1200, borderRadius: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Interview Notes</Typography>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <TextField fullWidth placeholder="Write notes..." value={notes} onChange={e => setNotes(e.target.value)} multiline minRows={2} maxRows={4} variant="outlined" sx={{ borderRadius: 2 }} />
                            <Button variant="contained" color="primary" startIcon={isSendingNotes ? <CircularProgress size={16} color="inherit" /> : <Send />} onClick={handleNotes} disabled={isSendingNotes || !notes.trim()} sx={{ borderRadius: 2, px: 3, py: 1.5 }}>Send</Button>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default VideoRoomPage;
