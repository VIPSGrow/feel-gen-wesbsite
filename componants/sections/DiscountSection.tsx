"use client";

import React, { useEffect, useMemo, useState } from "react";
import serverCallFuction from "@/lib/constantFunction";

type SampleFormState = {
  name: string;
  phone: string;
  email: string;
  gender: string;
  dob: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
};

type StateOption = { id: number | string; name: string };
type CityOption = { id: number | string; name: string };

const initialForm: SampleFormState = {
  name: "",
  phone: "",
  email: "",
  gender: "",
  dob: "",
  address: "",
  state: "",
  city: "",
  pincode: "",
};

const DiscountSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<SampleFormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [states, setStates] = useState<StateOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState<number | string | null>(null);

  const fetchStates = async () => {
    try {
      setStatesLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/static/states`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();
      if (json?.status && Array.isArray(json?.data)) {
        setStates(json.data);
      } else if (Array.isArray(json)) {
        setStates(json);
      } else {
        setStates([]);
      }
    } catch {
      setStates([]);
    } finally {
      setStatesLoading(false);
    }
  };

  const fetchCities = async (stateId: number | string) => {
    try {
      setCitiesLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/static/cities/${stateId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();
      if (json?.status && Array.isArray(json?.data)) {
        setCities(json.data);
      } else if (Array.isArray(json)) {
        setCities(json);
      } else {
        setCities([]);
      }
    } catch {
      setCities([]);
    } finally {
      setCitiesLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStates();
    }
  }, [isOpen]);

  const requiredMissing = useMemo(() => {
    const missing: string[] = [];
    if (!form.name.trim()) missing.push("Name");
    if (!form.phone.trim()) missing.push("Phone");
    if (!form.email.trim()) missing.push("Email");
    return missing;
  }, [form]);

  const openModal = () => {
    setIsOpen(true);
    setError(null);
    setSuccess(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setLoading(false);
    setError(null);
    setSuccess(null);
    setForm(initialForm);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (requiredMissing.length) {
      setError(`Please enter: ${requiredMissing.join(", ")}`);
      return;
    }

    const email = form.email.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phone = form.phone.trim();
    if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      setError("Phone must be exactly 10 digits.");
      return;
    }

    if (!form.state || !form.city) {
      setError("Please select state and city.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        gender: form.gender,
        dob: form.dob,
        address: form.address,
        state: form.state,
        city: form.city,
        pincode: form.pincode,
      };

      const resp = (await serverCallFuction(
        "POST",
        "api/sample-requests",
        payload,
      )) as { status?: boolean; message?: string };

      if (resp?.status === false) {
        setError(resp?.message || "Request failed");
        return;
      }

      setSuccess("Sample request submitted successfully. We will contact you soon!");
      setTimeout(() => closeModal(), 1000);

      setSelectedStateId(null);
      setCities([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };


  const getMaxDateFor21Years = () => {
    const today = new Date();
    const year = today.getFullYear() - 21; // Subtract 21 years
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // Returns format: YYYY-MM-DD
  };

  return (
    <>
      <section className="py-5">
        <div className="container-fluid">
          <div
            className="py-5 my-5 rounded-5"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundImage: "linear-gradient(45deg, #8DC63F, 1%, #8ee3ff, 60%, #e4a5c5)",
            }}
          >
            <div className="container my-md-5">
              <div className="row">
                <div className="col-md-10 col-12 mx-auto p-md-5 text-center text-dark">
                  <div className="section-header">
                    <h2 className="section-title display-5 fw-bold mb-4" data-aos="zoom-in">
                      Experience Premium Quality & Join the Feel Safe Mission
                    </h2>
                  </div>
                  <p className="lead mb-4" data-aos="zoom-in-up">
                    Start your journey with <strong>Feel Safe Pvt. Ltd.</strong> by requesting a product sample and exploring our women empowerment business opportunity. This is the first step to experience the quality of our premium sanitary pads and hygiene products while becoming a part of the <strong>Feel Safe Sakhi Network</strong>.
                  </p>

                  <div className="row justify-content-center g-3 mb-4" data-aos="flip-up">
                    {[
                      "Premium Quality Hygiene Products",
                      "Safe, Soft & Comfortable Protection",
                      "Women Empowerment & Self-Employment Opportunity",
                      "Trusted Direct Selling Business in India"
                    ].map((item, idx) => (
                      <div key={idx} className="col-md-auto">
                        <span className="badge bg-white text-dark border p-2 px-3 rounded-pill text-wrap">
                          ✔️ {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="fw-bold mt-4" style={{ color: "#1C1C1C" }} data-aos="zoom-in-up">
                    Feel Safe Sakhi Yojana — Quality Products, Better Health, Brighter Future.
                  </p>
                </div>

                <div className="col-md-10 col-12 mx-auto text-center mt-3" data-aos="flip-up">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg shadow-sm px-5 rounded-pill"
                    onClick={openModal}
                  >
                    Get Free Sample
                  </button>
                </div>

                {/* Modal remains same */}
                {isOpen && (
                  <div
                    className="modal show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-light">
                          <h5 className="modal-title fw-bold">Request Free Sample</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={closeModal}
                            aria-label="Close"
                          />
                        </div>

                        <form onSubmit={onSubmit}>
                          <div className="modal-body p-4">
                            {error && (
                              <div className="alert alert-danger" role="alert">
                                {error}
                              </div>
                            )}
                            {success && (
                              <div className="alert alert-success" role="alert">
                                {success}
                              </div>
                            )}

                            <div className="row g-3">
                              <div className="col-md-6">
                                <label htmlFor="sample_name" className="form-label">Name*</label>
                                {/* <input
                                  id="sample_name"
                                  name="name"
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="Name"
                                  value={form.name}
                                  onChange={onChange}
                                /> */}
                                <input
                                  type="text"
                                  className="form-control"
                                  value={form.name}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allows only letters (both uppercase and lowercase) and spaces
                                    if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
                                      setForm({ ...form, name: value });
                                    }
                                  }}
                                  placeholder="Full Name"
                                  required
                                />
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="sample_phone" className="form-label">Phone*</label>
                                <input
                                  id="sample_phone"
                                  name="phone"
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="Phone"
                                  value={form.phone}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const cleanValue = value.replace(/\D/g, "").slice(0, 10);
                                    onChange({
                                      target: { name: "phone", value: cleanValue }
                                    } as any);
                                  }}
                                  maxLength={10}
                                />
                              </div>

                              <div className="col-md-4">
                                <label htmlFor="sample_email" className="form-label">Email*</label>
                                <input
                                  id="sample_email"
                                  name="email"
                                  type="email"
                                  className="form-control form-control-lg"
                                  placeholder="abc@mail.com"
                                  value={form.email}
                                  onChange={onChange}
                                />
                              </div>

                              <div className="col-md-4">
                                <label htmlFor="sample_gender" className="form-label">Gender</label>
                                <select
                                  id="sample_gender"
                                  name="gender"
                                  className="form-control form-control-lg"
                                  value={form.gender}
                                  onChange={onChange}
                                >
                                  <option value="">Select</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>

                              <div className="col-md-4">
                                <label htmlFor="sample_dob" className="form-label">DOB</label>
                                <input
                                  id="sample_dob"
                                  name="dob"
                                  type="date"
                                  className="form-control form-control-lg"
                                  value={form.dob}
                                  onChange={onChange}
                                  max={getMaxDateFor21Years()}
                                />
                              </div>

                              <div className="col-12">
                                <label htmlFor="sample_address" className="form-label">Address</label>
                                <input
                                  id="sample_address"
                                  name="address"
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="Address"
                                  value={form.address}
                                  onChange={onChange}
                                />
                              </div>

                              <div className="col-md-4">
                                <label htmlFor="sample_state" className="form-label">State</label>
                                <select
                                  id="sample_state"
                                  name="state"
                                  className="form-control form-control-lg"
                                  value={form.state}
                                  onChange={async (e) => {
                                    const nextStateName = e.target.value;
                                    const nextState = states.find((s) => String(s.name) === String(nextStateName));
                                    const nextStateId = nextState?.id ?? null;
                                    setSelectedStateId(nextStateId);
                                    setForm((prev) => ({ ...prev, state: nextStateName, city: "" }));
                                    if (nextStateId !== null) await fetchCities(nextStateId);
                                    else setCities([]);
                                  }}
                                  disabled={statesLoading}
                                >
                                  <option value="">{statesLoading ? "Loading..." : "Select state"}</option>
                                  {states.map((s) => (
                                    <option key={String(s.id)} value={s.name}>{s.name}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="col-md-4">
                                <label htmlFor="sample_city" className="form-label">City</label>
                                <select
                                  id="sample_city"
                                  name="city"
                                  className="form-control form-control-lg"
                                  value={form.city}
                                  onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                                  disabled={!form.state || citiesLoading}
                                >
                                  <option value="">{citiesLoading ? "Loading..." : "Select city"}</option>
                                  {cities.map((c) => (
                                    <option key={String(c.id)} value={c.name}>{c.name}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="col-md-4">
                                <label htmlFor="sample_pincode" className="form-label">Pincode</label>
                                <input
                                  id="sample_pincode"
                                  name="pincode"
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="Pincode"
                                  maxLength={6} // Prevents typing more than 6 characters
                                  value={form.pincode}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allows only numbers and restricts length to 6 digits
                                    if (value === "" || /^[0-9]{0,6}$/.test(value)) {
                                      onChange(e); // Calls your existing global onChange handler
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal} disabled={loading}>
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                              {loading ? "Submitting..." : "Submit"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscountSection;