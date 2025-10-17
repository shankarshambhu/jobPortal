"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reschedule = exports.RescheduleStatus = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const interview_1 = require("./interview");
var RescheduleStatus;
(function (RescheduleStatus) {
    RescheduleStatus["PENDING"] = "pending";
    RescheduleStatus["ACCEPTED"] = "accepted";
    RescheduleStatus["REJECTED"] = "rejected";
})(RescheduleStatus || (exports.RescheduleStatus = RescheduleStatus = {}));
let Reschedule = class Reschedule extends typeorm_1.BaseEntity {
};
exports.Reschedule = Reschedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reschedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => interview_1.Interview, (interview) => interview.reschedule, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", interview_1.Interview)
], Reschedule.prototype, "interview", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.reschedules, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_1.User)
], Reschedule.prototype, "candidate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", nullable: false }),
    __metadata("design:type", Date)
], Reschedule.prototype, "newDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Reschedule.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: RescheduleStatus, default: RescheduleStatus.PENDING }),
    __metadata("design:type", String)
], Reschedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reschedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Reschedule.prototype, "updatedAt", void 0);
exports.Reschedule = Reschedule = __decorate([
    (0, typeorm_1.Entity)()
], Reschedule);
