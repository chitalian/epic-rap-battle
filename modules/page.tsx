import clsx from "clsx";
import { ReactNode } from "react";
import { Col } from "./column";

export default function Page(props: {
  className?: string;
  children?: ReactNode;
}) {
  const { className, children } = props;
  return (
    <div className="relative">
      <div
        className={clsx("min-h-screen w-full bg-black text-white px-4 py-2")}
      >
        <Col className={clsx("mx-auto", className)}>{children}</Col>
      </div>
      <div className="fixed min-h-screen bg-black -z-20 top-0 bottom-0 right-0 left-0" />
    </div>
  );
}
