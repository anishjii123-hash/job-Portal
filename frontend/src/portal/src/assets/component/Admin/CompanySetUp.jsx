
import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/assets/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetSingleCompany from "@/hooks/useGetSingleCompany";

// ✅ Lazy loaded Navbar
const Navbar = lazy(() =>
  import("flowbite-react").then((mod) => ({ default: mod.Navbar }))
);

const CompanySetUp = () => {
  const { id } = useParams();
  useGetSingleCompany(id);

  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // ✅ Memoized handlers
  const changeEventHandler = useCallback((e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const changeFileHandler = useCallback((e) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, file }));
  }, []);

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      try {
        const res = await axios.put(
          `${COMPANY_API_END_POINT}/update/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/admin/companies");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
    [input, id, navigate]
  );

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <Navbar />

      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input name="name" value={input.name} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} />
            </div>
          </div>

          <Button type="submit" className="w-full mt-8">
            UPDATE
          </Button>
        </form>
      </div>
    </Suspense>
  );
};

export default CompanySetUp;
