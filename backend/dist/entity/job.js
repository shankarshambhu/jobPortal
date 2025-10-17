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
exports.Job = exports.JobType = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const application_1 = require("./application");
var JobType;
(function (JobType) {
    JobType["FULL_TIME"] = "fulltime";
    JobType["PART_TIME"] = "parttime";
    JobType["INTERNSHIP"] = "internship";
})(JobType || (exports.JobType = JobType = {}));
let Job = class Job extends typeorm_1.BaseEntity {
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], Job.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Job.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: JobType, default: JobType.FULL_TIME }),
    __metadata("design:type", String)
], Job.prototype, "jobtype", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Job.prototype, "enddate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.job, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_1.User)
], Job.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_1.Application, (application) => application.job),
    __metadata("design:type", Array)
], Job.prototype, "application", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)()
], Job);
