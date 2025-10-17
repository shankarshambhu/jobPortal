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
exports.CandidateProfile = exports.Gender = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (exports.Gender = Gender = {}));
let CandidateProfile = class CandidateProfile extends typeorm_1.BaseEntity {
};
exports.CandidateProfile = CandidateProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CandidateProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CandidateProfile.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CandidateProfile.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], CandidateProfile.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CandidateProfile.prototype, "experienceYears", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CandidateProfile.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Gender, default: Gender.MALE }),
    __metadata("design:type", String)
], CandidateProfile.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CandidateProfile.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CandidateProfile.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.User, (user) => user.candidateProfile, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_1.User)
], CandidateProfile.prototype, "user", void 0);
exports.CandidateProfile = CandidateProfile = __decorate([
    (0, typeorm_1.Entity)()
], CandidateProfile);
