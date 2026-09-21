"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect } from "react";
import serverCallFuction from "@/lib/constantFunction";
import { Loader2, Save, User as UserIcon, Lock } from "lucide-react";

export default function ProfilePage() {
  const { user, fetchUser, loading: authLoading } = useAuth();

  const [isUserLoading, setIsUserLoading] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    distributor_code: "",
  });



  // Sync user data + fetch if needed
  useEffect(() => {
    console.log("user - ", user);
    if (!user && !authLoading) {
      fetchUser();
    }
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        distributor_code: user.distributor_code || "",
      });
    }
  }, [user, authLoading, fetchUser]);

  if (authLoading) {
    return (
      <div className="container-fluid p-0 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading profile...</span>
        </div>
      </div>
    );
  }

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = (await serverCallFuction(
        "PUT",
        "api/ecom/profile",
        formData,
      )) as any;
      if (res.success) {
        await fetchUser();
        setSuccess("Profile updated successfully!");
      } else {
        setError(res.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const res = (await serverCallFuction(
        "PUT",
        "api/ecom/auth/change-password",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      )) as any;

      if (res.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccess("Password changed successfully!");
      } else {
        setError(res.message || "Failed to change password");
      }
    } catch (err) {
      setError("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  console.log("user?.distributor_code = ", user?.distributor_code);

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="bg-primary bg-opacity-10 p-2 rounded-3">
          <UserIcon className="text-primary" size={28} />
        </div>
        <h2 className="fw-bold m-0">Account Settings</h2>
      </div>

      {success && (
        <div
          className="alert alert-success border-0 shadow-sm rounded-4 mb-4"
          role="alert"
        >
          <i className="bi bi-check-circle-fill me-2"></i> {success}
        </div>
      )}

      {error && (
        <div
          className="alert alert-danger border-0 shadow-sm rounded-4 mb-4"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
        </div>
      )}

      <div className="row g-4">
        {/* Profile Info */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-4">Personal Information</h5>
              <form onSubmit={handleProfileUpdate}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label small fw-bold text-muted">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 border-light-subtle"
                      style={{ backgroundColor: "#f9fafb" }}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3 border-light-subtle"
                      style={{ backgroundColor: "#f9fafb" }}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3 border-light-subtle"
                      style={{ backgroundColor: "#f9fafb" }}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label small fw-bold text-muted">
                      Distributor Code
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 border-light-subtle"
                      style={{ backgroundColor: "#f9fafb" }}
                      value={formData.distributor_code}
                      // disabled={formData.distributor_code !== ""}
                      disabled={user?.distributor_info?.full_name !== null}
                      // onChange={(e) =>
                      //   setFormData({
                      //     ...formData,
                      //     distributor_code: e.target.value || "",
                      //   })
                      // }
                      placeholder="e.g. - FS0000"
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();

                        // 1. Allow empty input (so they can backspace everything)
                        // 2. Allow typing 'F' as the first character
                        // 3. Allow 'FS' followed by up to 4 digits
                        if (value === "" || value === "F" || /^FS\d{0,10}$/.test(value)) {
                          setFormData({
                            ...formData,
                            distributor_code: value,
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-lg w-100 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Save size={20} />
                      )}
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <Lock size={20} className="text-orange-500" />
                <h5 className="card-title fw-bold m-0">Security</h5>
              </div>
              <form onSubmit={handlePasswordChange}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    Current Password
                  </label>
                  <input
                    type="text"
                    placeholder="Enter current password"
                    className="form-control rounded-3 border-light-subtle"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    New Password
                  </label>
                  <input
                    type="text"
                    placeholder="Enter new password"
                    className="form-control rounded-3 border-light-subtle"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">
                    Confirm New Password
                  </label>
                  <input
                    type="text"
                    placeholder="Enter confirm password"
                    className="form-control rounded-3 border-light-subtle"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-warning btn-lg w-100 rounded-3 text-white fw-bold shadow-sm"
                  style={{
                    background: "linear-gradient(to right, #f59e0b, #d97706)",
                  }}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
