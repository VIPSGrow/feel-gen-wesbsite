"use client";

import { useEffect, useState } from "react";
import { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from "@/lib/addressApi";
import type { Address, CreateAddressData } from "@/lib/types/Address";
import { Loader2, Plus, Edit3, Crown, MapPin, Trash } from "lucide-react";


export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [states, setStates] = useState<Array<{ id: number | string; name: string }>>([]);
  const [cities, setCities] = useState<Array<{ id: number | string; name: string }>>([]);

  const [selectedStateId, setSelectedStateId] = useState<number | string | null>(null);

  const [formData, setFormData] = useState<CreateAddressData>({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
    is_default: false,
  });

  const [error, setError] = useState("");
  const [pincodeError, setPincodeError] = useState("");


  useEffect(() => {
    fetchAddresses();
    fetchStates();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await getAddresses();
      if (res.status) {
        setAddresses(res.data || []);
      }
    } catch (err) {
      setError("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };



  const fetchStates = async () => {
    try {
      setStatesLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/static/states`, {
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
      }
    } catch (e) {
      // Keep silent; will show validation-style errors later
    } finally {
      setStatesLoading(false);
    }
  };

  const fetchCities = async (stateId: number | string) => {
    try {
      setCitiesLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/static/cities/${stateId}`;
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
    } catch (e) {
      setCities([]);
    } finally {
      setCitiesLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, isEdit = false) => {
    e.preventDefault();

    // Frontend pincode validation (numeric + exactly 6 digits)
    const pincode = formData.pincode?.trim() || "";
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError("Pincode must be exactly 6 digits.");
      return;
    }

    setPincodeError("");

    // Frontend phone validation (numeric + 10 digits)
    const phone = (formData.phone || "").trim();
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    // Ensure dropdown selections are present
    if (!formData.state || !formData.city) {
      setError("Please select state and city.");
      return;
    }

    try {
      let res;
      if (isEdit && editingId) {
        res = await updateAddress(editingId, formData);
      } else {
        res = await addAddress(formData);
      }
      if (res.status) {
        fetchAddresses();
        closeModal();
      }
    } catch (err) {
      setError("Failed to save address");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await deleteAddress(id);
      if (res.status) {
        fetchAddresses();
      }
    } catch (err) {
      setError("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      const res = await setDefaultAddress(id);
      if (res.status) {
        fetchAddresses();
      }
    } catch (err) {
      setError("Failed to set default address");
    }
  };

  const openEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData({
      full_name: address.full_name,
      phone: address.phone,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || address.landmark || "",
      city: address.city,
      state: address.state,
      country: "India",
      pincode: address.pincode,
      landmark: address.landmark || "",
      is_default: address.is_default,
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingId(null);
    setSelectedStateId(null);
    setCities([]);

    setFormData({
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      landmark: "",
      is_default: false,
    });
    setError("");
    setPincodeError("");
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-50 py-5">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="d-md-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary bg-opacity-10 p-2 rounded-3">
            <MapPin className="text-primary" size={28} />
          </div>
          <div>
            <h2 className="fw-bold m-0">Saved Addresses</h2>
            <p className="text-muted mb-0 small">Manage your delivery locations</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-success rounded-3 mt-3 mt-md-0 d-flex align-items-center gap-2 px-4 shadow-sm"
        >
          <Plus size={18} /> Add New Address
        </button>
      </div>

      {(!showAddModal && error) && (
        <div className="alert alert-danger border-0 rounded-4 shadow-sm mb-4">
          <i className="bi bi-exclamation-circle me-2"></i> {error}
        </div>
      )}

      {/* Address Content */}
      {addresses.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm text-center py-5">
          <div className="card-body">
            <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
              <MapPin size={40} className="text-muted" />
            </div>
            <h4 className="fw-bold">No addresses saved</h4>
            <p className="text-muted mx-auto" style={{ maxWidth: '300px' }}>
              Add your first delivery address to experience a faster checkout.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary px-4 py-2 mt-2 rounded-3"
            >
              Add Your First Address
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {addresses.map((address) => (
            <div key={address.id} className="col-md-6 col-xl-4">
              <div className={`card h-100 border-0 shadow-sm rounded-4 position-relative transition-hover ${address.is_default ? 'border-start border-primary border-4' : ''}`}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">{address.full_name || "Home"}</h5>
                      {address.is_default && (
                        <span className="badge bg-warning text-dark rounded-pill small">
                          <Crown size={12} className="me-1" /> Default
                        </span>
                      )}
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-light btn-sm rounded-pill" type="button" data-bs-toggle="dropdown">
                        <Edit3 size={14} className="text-muted" />
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                        <li><button className="dropdown-item py-2" onClick={() => openEdit(address)}>Edit Details</button></li>
                        {!address.is_default && (
                          <li><button className="dropdown-item py-2" onClick={() => handleSetDefault(address.id)}>Make Default</button></li>
                        )}
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item py-2 text-error" onClick={() => handleDelete(address.id)}>Delete Address</button></li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-secondary small">
                    <p className="mb-1 p-0 text-dark fw-medium">{address.address_line1}, {address.address_line2}</p>
                    <p className="mb-2 p-0 text-dark fw-medium">{address.city}, {address.state} - {address.pincode}</p>
                    <p className="mb-0 p-0 fw-bold text-dark mt-2">
                      <small className="text-muted fw-normal me-2 text-uppercase">Phone:</small>
                      {address.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showAddModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal d-block fade show" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold">
                    {editingId ? "Edit Address" : "Add New Address"}
                  </h5>
                  <button type="button" className="btn-close shadow-none" onClick={closeModal}></button>
                </div>
                <div className="modal-body p-4">
                  {(showAddModal && error) && (
                    <div className="alert alert-danger border-0 rounded-4 shadow-sm mb-4">
                      <i className="bi bi-exclamation-circle me-2"></i> {error}
                    </div>
                  )}
                  <form onSubmit={(e) => handleSubmit(e, !!editingId)}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Full Name</label>
                      {/* <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="form-control form-control-lg rounded-3 border-light-subtle bg-light"
                        required
                      /> */}


                      <input
                        type="text"
                        className="form-control"
                        value={formData.full_name}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allows only letters (both uppercase and lowercase) and spaces
                          if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
                            setFormData({ ...formData, full_name: value });
                          }
                        }}
                        placeholder="Full Name"
                        required
                      />


                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Address Line 1</label>
                      <textarea
                        rows={2}
                        placeholder="House No, Street, Area..."
                        value={formData.address_line1}
                        onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                        className="form-control rounded-3 border-light-subtle bg-light"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Address Line 2 / Landmark</label>
                      <input
                        type="text"
                        value={formData.address_line2}
                        onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                        className="form-control rounded-3 border-light-subtle bg-light"
                        placeholder="Optional: Building, Landmark, etc."
                      />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">State</label>
                        <select
                          value={formData.state}
                          onChange={async (e) => {
                            const nextStateName = e.target.value;
                            const nextState = states.find((s) => String(s.name) === String(nextStateName));
                            const nextStateId = nextState?.id ?? null;

                            setSelectedStateId(nextStateId);
                            setFormData({ ...formData, state: nextStateName, city: "" });

                            if (nextStateId !== null) {
                              await fetchCities(nextStateId);
                            } else {
                              setCities([]);
                            }
                          }}
                          className="form-control rounded-3 border-light-subtle bg-light"
                          required
                          disabled={statesLoading}
                        >
                          <option value="">{statesLoading ? "Loading states..." : "Select state"}</option>
                          {states.map((s) => (
                            <option key={String(s.id)} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">City</label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="form-control rounded-3 border-light-subtle bg-light"
                          required
                          disabled={!formData.state || citiesLoading}
                        >
                          <option value="">{citiesLoading ? "Loading cities..." : "Select city"}</option>
                          {cities.map((c) => (
                            <option key={String(c.id)} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Pincode</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Enter pincode"
                          value={formData.pincode}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, "");
                            setFormData({ ...formData, pincode: next });
                            if (pincodeError) setPincodeError("");
                          }}
                          onBlur={() => {
                            const p = (formData.pincode || "").trim();
                            if (p && !/^\d{6}$/.test(p)) {
                              setPincodeError("Pincode must be exactly 6 digits.");
                            }
                          }}
                          className={`form-control rounded-3 border-light-subtle bg-light ${pincodeError ? "is-invalid" : ""}`}
                          required
                        />
                        {pincodeError && (
                          <div className="invalid-feedback" style={{ display: "block" }}>
                            {pincodeError}
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          // onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="form-control rounded-3 border-light-subtle bg-light"
                          required
                          placeholder="Enter phone number"
                          maxLength={10}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, "");
                            setFormData({ ...formData, phone: next });
                            // if (phoneer) setPincodeError("");
                          }}
                          onBlur={() => {
                            const p = (formData.phone || "").trim();
                            if (p && !/^\d{10}$/.test(p)) {
                              // setPhoneError("Phone number must be exactly 10 digits.");
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="is_default"
                        checked={formData.is_default}
                        onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                      />
                      <label className="form-check-label fw-medium" htmlFor="is_default">
                        Set as default address
                      </label>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary btn-lg rounded-3 flex-grow-1 shadow-sm">
                        {editingId ? "Update Address" : "Save Address"}
                      </button>
                      <button type="button" className="btn btn-light btn-lg rounded-3 flex-grow-1" onClick={closeModal}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .transition-hover:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
          border-color: rgba(13, 110, 253, 0.2) !important;
        }
        .modal-backdrop {
          z-index: 1040 !important;
        }
        .modal {
          z-index: 1050 !important;
        }
      `}</style>
    </div>
  );
}
