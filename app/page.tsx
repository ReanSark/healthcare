import Image from "next/image";
// eslint-disable-next-line import/order
import Link from "next/link";

// import { PatientForm } from "@/components/forms/PatientForm";

import { UserRegisterForm } from "@/components/forms/UserRegisterForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {/* <PatientForm /> */}
          <UserRegisterForm />

          <div className="text-14-regular mt-3 flex">
            <p className="justify-items-end text-dark-600 xl:text-left">
              Already have an account? 
            </p>
            <Link href="/register" className="text-green-500">
              Login
            </Link>
          </div>

          <div className="text-14-regular mt-10 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 CamCare
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
