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
exports.Interview = exports.InterviewStatus = void 0;
const typeorm_1 = require("typeorm");
const application_1 = require("./application");
const user_1 = require("./user");
const reshedule_1 = require("./reshedule");
var InterviewStatus;
(function (InterviewStatus) {
    InterviewStatus["SCHEDULED"] = "scheduled";
    InterviewStatus["COMPLETED"] = "completed";
    InterviewStatus["CANCELLED"] = "cancelled";
})(InterviewStatus || (exports.InterviewStatus = InterviewStatus = {}));
let Interview = class Interview extends typeorm_1.BaseEntity {
};
exports.Interview = Interview;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Interview.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => application_1.Application, (application) => application.interviews, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", application_1.Application)
], Interview.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_1.User)
], Interview.prototype, "interviewer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], Interview.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: InterviewStatus, default: InterviewStatus.SCHEDULED }),
    __metadata("design:type", String)
], Interview.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Interview.prototype, "roomLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Interview.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reshedule_1.Reschedule, (reschedule) => reschedule.interview),
    __metadata("design:type", Array)
], Interview.prototype, "reschedule", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Interview.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Interview.prototype, "updatedAt", void 0);
exports.Interview = Interview = __decorate([
    (0, typeorm_1.Entity)()
], Interview);
