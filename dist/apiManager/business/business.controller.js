"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const aws_sdk_1 = require("aws-sdk");
const imagemin_1 = __importDefault(require("imagemin"));
const imagemin_mozjpeg_1 = __importDefault(require("imagemin-mozjpeg"));
const sharp_1 = __importDefault(require("sharp"));
const BusinessUser_1 = require("../../entity/BusinessUser");
const Business_1 = require("../../entity/Business");
const BusinessHour_1 = require("../../entity/BusinessHour");
const BusinessFile_1 = require("../../entity/BusinessFile");
const User_1 = require("../../entity/User");
const mails_1 = require("../../mails/mails");
const s3 = new aws_sdk_1.S3({ region: 'us-east-2', credentials: { accessKeyId: 'AKIAX64L7XCVTA7JXFEM', secretAccessKey: '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' } });
const convertToJpg = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return sharp_1.default(input)
        .resize(720)
        .toBuffer();
});
class BusinessController {
    getBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield typeorm_1.getConnection()
                    .getRepository(Business_1.Business)
                    .createQueryBuilder('business')
                    .leftJoinAndSelect('business.businessUser', 'businessUser')
                    .where("businessUser.userId = :userId", { userId: req.session.userId })
                    .getOne();
                return res.json({
                    success: true,
                    business,
                });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let business;
            var bussinessId = 0;
            try {
                const body = req.body;
                business = yield Business_1.Business.create(body).save();
                if (!business) {
                    return res.json({ success: false });
                }
                bussinessId = business.id;
                yield BusinessUser_1.BusinessUser.create({ userId: req.session.userId, businessId: business.id }).save();
                const user = yield User_1.User.findOne({ id: req.session.userId });
                if (user) {
                    mails_1.sendMailWelcomeStore(user.email);
                    mails_1.addContactBusiness(user);
                }
                return res.json({ success: true, business });
            }
            catch (error) {
                yield Business_1.Business.delete({ id: bussinessId });
                return res.json({ success: false, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const business = yield Business_1.Business.update({ id }, Object.assign({}, req.body));
                return res.json({ success: true, business });
            }
            catch (error) {
                return res.json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    createHours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const values = req.body.days;
                const businessId = Number(req.params.id);
                const businessHrs = yield BusinessHour_1.BusinessHour.findOne({ where: { businessId } });
                if (businessHrs) {
                    yield BusinessHour_1.BusinessHour.delete({ businessId });
                }
                console.log('Valores a insertar', values);
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(BusinessHour_1.BusinessHour)
                    .values(values)
                    .execute();
                return res.json({ success: true, values });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    getHours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessId = Number(req.params.id);
                const hours = yield BusinessHour_1.BusinessHour.find({ where: { businessId }, order: { dayOfWeek: 'ASC' } });
                return res.json({ success: true, hours });
            }
            catch (error) {
                return res.json({ success: false, message: error.messahe });
            }
        });
    }
    uploadCover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield Business_1.Business.findOne({ where: { id: req.user.businessUser.businessId } });
                if (business && business.cover) {
                    const imgName = business.cover.split('/')[4];
                    yield s3.deleteObject({
                        Bucket: 'reserly-dev',
                        Key: `${req.user.businessUser.businessId}/${imgName}`
                    }).promise();
                }
                const miniBuffer = yield imagemin_1.default.buffer(req.file.buffer, {
                    plugins: [convertToJpg, imagemin_mozjpeg_1.default({ quality: 80 })]
                });
                const fileName = `${req.user.businessUser.businessId}-${uuid_1.v4()}${path_1.default.extname(req.file.originalname)}`;
                const response = yield s3.upload({
                    Bucket: 'reserly-dev',
                    Key: `${req.user.businessUser.businessId}/${fileName}`,
                    Body: miniBuffer,
                    ACL: 'public-read',
                }).promise();
                yield Business_1.Business.update({ id: req.user.businessUser.businessId }, { cover: response.Location });
                return res.json({ message: 'subiendo imagen', data: req.file });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    uploadPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const miniBuffer = yield imagemin_1.default.buffer(req.file.buffer, {
                    plugins: [convertToJpg, imagemin_mozjpeg_1.default({ quality: 80 })]
                });
                const fileName = `${req.user.businessUser.businessId}-${uuid_1.v4()}${path_1.default.extname(req.file.originalname)}`;
                let resp = yield s3.upload({
                    Bucket: 'reserly-dev',
                    Key: `${req.user.businessUser.businessId}/${fileName}`,
                    Body: miniBuffer,
                    ACL: 'public-read',
                }).promise();
                yield BusinessFile_1.BusinessFile.create({ file: resp.Location, businessId: req.user.businessUser.businessId }).save();
                const files = yield BusinessFile_1.BusinessFile.find({ where: { businessId: req.user.businessUser.businessId } });
                return res.json({ success: true, message: 'subiendo imagen', data: req.file, files });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    getPhotos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { businessId } = req.user.businessUser;
                const photos = yield BusinessFile_1.BusinessFile.find({ where: { businessId } });
                return res.json({ success: true, photos });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
    deletePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const businessFile = yield BusinessFile_1.BusinessFile.findOne({ id });
                if (businessFile && businessFile.file) {
                    console.log('Eliminando');
                    const imgName = businessFile.file.split('/')[4];
                    console.log('Eliminando', imgName);
                    yield s3.deleteObject({
                        Bucket: 'reserly-dev',
                        Key: `${req.user.businessUser.businessId}/${imgName}`
                    }).promise();
                }
                businessFile === null || businessFile === void 0 ? void 0 : businessFile.remove();
                return res.json({ success: true, businessFile });
            }
            catch (error) {
                return res.json({ success: false, message: error.message });
            }
        });
    }
}
exports.default = BusinessController;
//# sourceMappingURL=business.controller.js.map