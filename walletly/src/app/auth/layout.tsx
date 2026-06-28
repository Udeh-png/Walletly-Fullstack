import { AuthLeftSide } from "./components/AuthLeftSide";

export default function Layout({
  children,
  AuthPages,
}: {
  children: React.ReactNode;
  AuthPages: React.ReactNode;
}) {
  return (
    <div className="md:px-20 md:pt-7 pt-5 px-2">
      <div className="fixed size-120 blur-3xl rounded-full md:-bottom-50 -top-50 -left-30 bg-primary -z-10 opacity-10" />

      <div className="grid lg:grid-cols-2 mx-auto gap-x-10">
        {children}

        <div className="pr-1">
          <AuthLeftSide></AuthLeftSide>
        </div>

        <div>{AuthPages}</div>
      </div>

      <div className="fixed size-120 blur-3xl rounded-full md:-bottom-50 -bottom-100 -right-10 bg-primary -z-10 opacity-10" />
    </div>
  );
}
