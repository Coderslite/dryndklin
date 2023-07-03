export async function loggingOut(req, res) {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
    .status(200)
    .send({msg: "Logged out successfully."})
}