"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import serverCallFuction from "@/lib/constantFunction";

const VerifyCompo = () => {
    const searchParams = useSearchParams();

    const userId = searchParams.get("userId");
    const level = searchParams.get("level");

    const [user, setUser] = useState<any>(null);

    const fetchUserDetails = async () => {
        const res = await serverCallFuction(
            "GET",
            `api/users/by_id/${userId}`
        );

        if (res?.status) {
            setUser(res.user);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    if (!user) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-success"></div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="card shadow border-0">

                        {/* Header */}
                        <div className="card-header bg-success text-white text-center py-4">
                            <h2 className="mb-1">Distributor Verification</h2>
                            <p className="mb-0">{level}</p>
                        </div>

                        {/* Body */}
                        <div className="card-body">

                            <div className="text-center mb-4">
                                <img
                                    src={user.profile_pic}
                                    alt={user.full_name}
                                    className="rounded-circle border"
                                    width="140"
                                    height="140"
                                />

                                <h3 className="mt-3">{user.full_name}</h3>

                                <span
                                    className={`badge fs-6 ${user.kyc_status
                                        ? "bg-success"
                                        : "bg-danger"
                                        }`}
                                >
                                    {user.kyc_status
                                        ? "✔ Verified User"
                                        : "✖ Not Verified"}
                                </span>
                            </div>

                            <div className="row">

                                {/* Personal */}
                                <div className="col-md-12">

                                    <h5 className="border-bottom pb-2">
                                        Personal Details
                                    </h5>

                                    <table className="table table-sm">

                                        <tbody>

                                            <tr>
                                                <th>User ID</th>
                                                <td>{user.id}</td>
                                                <th>Username</th>
                                                <td>{user.username}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>{user.phone}</td>
                                                <th>Email</th>
                                                <td>{user.email}</td>
                                            </tr>



                                            <tr>
                                                <th>PAN</th>
                                                <td>{user.pan_no}</td>
                                                <th>Aadhaar</th>
                                                <td>{user.aadhaar_no}</td>
                                            </tr>



                                            <tr>
                                                <th>Referral Code</th>
                                                <td>{user.referral_code}</td>
                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                                {/* Bank */}


                            </div>

                            <hr />

                            <h5>Address</h5>

                            <p className="mb-1">
                                {user.address}
                            </p>

                            <p className="text-muted">
                                {user.state_name} - {user.pin}
                            </p>

                        </div>

                        {/* Footer */}
                        <div className="card-footer text-center">

                            {user.kyc_status ? (
                                <div className="alert alert-success mb-0">
                                    <strong>This distributor is KYC Verified.</strong>
                                </div>
                            ) : (
                                <div className="alert alert-danger mb-0">
                                    <strong>KYC Verification Pending.</strong>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default VerifyCompo;