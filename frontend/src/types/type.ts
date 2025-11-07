// Company profile (nested under company user)
export interface CompanyProfile {
    id: number;
    companyName: string;
    website: string;
    address: string;
    logourl: string;
}

// Company user (job poster)
export interface CompanyUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "company";
    date: string;
    companyProfile: CompanyProfile;
}

// Job posted by the company
export interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
    salary: number;
    jobtype: string;
    createdAt: string;
    enddate: string;
    user: CompanyUser;
}

// Candidate profile (nested under candidate user)
export interface CandidateProfile {
    id: number;
    age: number;
    address: string;
    skills: string[];
    experienceYears: number;
    resume: string;
    gender: string;
    date_of_birth: string;
    phone_number: string;
}

// Candidate user (who applied)
export interface CandidateUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "candidate";
    date: string;
    candidateProfile: CandidateProfile;
}

// **Single Application type**
// export interface Application {
//     id: number;
//     status: string;
//     coverLetter: string;
//     appliedAt: string;
//     job: Job;
//     user: CandidateUser;
//     interviews: Interview[]
// }
export interface Interview {
    id: number;
    scheduledAt: Date;
    status: string;
    roomLink?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date
}
