import { ReactNode } from "react";
import { Separator } from "../separator";
import { ThemeToggle } from "../theme-toggle";
import PageTitle from "../page-title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb";
import { NavUser } from "../nav-user";
import { Button } from "../button";
import Link from "next/link";
import { ArrowLeft, PackageCheck } from "lucide-react";

export type BreadcrumbType = {
  title: string;
  href: string;
};

export type LayoutProps = {
  heading?: string;
  headingClassName?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  backPath?: string;
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
  breadcrumbs: BreadcrumbType[];
};

export default function MainContainer({
  heading,
  headingClassName,
  description,
  actions,
  breadcrumbs,
  backPath,
  user,
  children,
}: LayoutProps) {
  return (
    <div className="w-full h-screen dark:bg-[#0d0c10] md:p-2 md:pl-0">
      <div className="w-full h-full dark:bg-[#b4abc40d] md:border md:rounded-xl">
        <header className="w-full flex items-center justify-between px-2 md:py-3 md:px-8">
          <div>
            <Breadcrumb className="hidden md:block">
              <BreadcrumbList>
                {breadcrumbs.length > 1 &&
                  breadcrumbs.map((bc) => {
                    if (bc.title === breadcrumbs[breadcrumbs.length - 1].title)
                      return;
                    return (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink href={bc.href}>
                            {bc.title}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </>
                    );
                  })}
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {breadcrumbs[breadcrumbs.length - 1].title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {backPath ? (
              <div className="w-full h-full flex justify-center ml-2 md:hidden lg:px-2 items-center">
                <Button variant="secondary" asChild>
                  <Link href={backPath} className="">
                    <ArrowLeft /> Back
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="w-full flex justify-start md:hidden items-center gap-1 px-2">
                <PackageCheck size={28} />
                <h1 className="font-bold text-2xl">TaskFlow</h1>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <div className="md:hidden">
              <NavUser user={user} />
            </div>
          </div>
        </header>
        <Separator orientation="horizontal" className=" h-4" />
        <div className="max-w-5xl mx-auto p-6">
          {heading && (
            <PageTitle className={headingClassName}>{heading}</PageTitle>
          )}
          {description && <h3>{description}</h3>}
          <div className="my-4">{actions}</div>
          {children}
        </div>
      </div>
    </div>
  );
}
