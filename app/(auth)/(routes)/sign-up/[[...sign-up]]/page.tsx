import { SignUp } from "@clerk/nextjs";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#90C12D",
            fontFamily: "Roboto",
            fontSize: "1rem",
            borderRadius: "2px",
          },
          elements: {
            formButtonPrimary:
              "bg-primary hover:bg-slate-400 text-sm normal-case",
          },
        }}
      />
    </div>
  );
};

export default Page;
