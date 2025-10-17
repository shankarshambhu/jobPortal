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
exports.User = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const candidateProfile_1 = require("./candidateProfile");
const companyProfile_1 = require("./companyProfile");
const application_1 = require("./application");
const job_1 = require("./job");
const reshedule_1 = require("./reshedule");
var Role;
(function (Role) {
    Role["CANDIDATE"] = "candidate";
    Role["COMPANY"] = "company";
    Role["ADMIN"] = "admin";
})(Role || (exports.Role = Role = {}));
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Role, default: Role.CANDIDATE }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], User.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => candidateProfile_1.CandidateProfile, (profile) => profile.user),
    __metadata("design:type", candidateProfile_1.CandidateProfile)
], User.prototype, "candidateProfile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => companyProfile_1.CompanyProfile, (profile) => profile.user),
    __metadata("design:type", companyProfile_1.CompanyProfile)
], User.prototype, "companyProfile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_1.Application, (application) => application.user),
    __metadata("design:type", Array)
], User.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_1.Job, (job) => job.user),
    __metadata("design:type", Array)
], User.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reshedule_1.Reschedule, (reschedule) => reschedule.candidate),
    __metadata("design:type", Array)
], User.prototype, "reschedules", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
