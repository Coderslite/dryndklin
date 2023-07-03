
import { config } from "dotenv"
import VendorStaffOffice from "../../../models/vendors/staff/staffs.model.js";
import Vendor from "../../../models/vendors/vendors.model.js";


config();

export async function vendorStaffActivityStatusSetter(req, res, next) {

    try {
        const vendorId = req.userId
        const staffId = req.params.staffId

        const vendor = await Vendor.findById(vendorId)
        const staff = await VendorStaffOffice.findById(staffId)

        if (!vendor && !staff) {
            return res.status(401).send("Staff does not exist.")
        }
        
        let staffStatus;
        if (staff.activityStatus === true) {
            staffStatus = false
        }
       
        if (staff.activityStatus === false) {
            staffStatus = true
        }

        const result = await VendorStaffOffice.findOneAndUpdate(staff._id, { activityStatus: staffStatus }, { new: true });

        if (!result){
            return res.status(401).send({msg: "Something went wrong and registrations failed."})
        }

        if (result && staffStatus == true) return res.status(200).send({ msg: "Staff activated successfully!" });

        if (result && staffStatus == false) return res.status(200).send({ msg: "Staff deactivated successfully!" });


    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }

}