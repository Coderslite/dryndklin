import VendorStaffOffice from "../../../models/vendors/staff/staffs.model.js";
import Vendor from "../../../models/vendors/vendors.model.js";
import { createStaffValidator } from "../../utils/validators/vendorValidator.module.js";

export async function staffCreator(req, res) {

    const {
        fullName, phone, email, documentType, documentTypeImageProof, accountDetailsImageProof, role
    } = req.body;

        
    try {

        const id = req.userId;
        const { error } = createStaffValidator(req.body);

        if (error) {
            return res.status(400).send({ msg: error.details[0].message } )
        }

        const checkEmailExistence = await Vendor.findOne({ email }).where("email").equals(email)
        if (checkEmailExistence) {
            return res.status(401).send({ msg: "User with email already existed as a vendor." })
        }

        const checkPhoneNumberExistence = await Vendor.findOne({ phone }).where("phone").equals(phone)
        if (checkPhoneNumberExistence) {
            return res.status(401).send({ msg: "User with phone number already existed as a vendor." })
        }

        let managerRoleExistence;

        if (req.body.role == "manager") {
            managerRoleExistence = await Vendor.findOne({ vendorId: id }).where("role").equals("manager")

            if (managerRoleExistence) return res.status(401).send({ msg: "You can only have one Manager at a time" })
        }

        const staff = new VendorStaffOffice({
            vendorId: id,
            fullName: req.body.fullName, 
            phone: req.body.phone, 
            email: req.body.email, 
            role: req.body.role,
            documentType: req.body.documentType, 
            documentTypeImageProof: req.body.documentTypeImageProof, 
            accountDetailsImageProof: req.body.accountDetailsImageProof
        });
       
        const result = await staff.save();

        if (!result){
            return res.status(401).send({msg: "Something went wrong and Staff creation failed."})
        }

        return res.status(200).send({ msg: "Staff Created successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message });
        // 
    }

}