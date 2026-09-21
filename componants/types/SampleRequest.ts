export type Gender = "male" | "female" | "other" | "";

export type SampleRequestPayload = {
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
