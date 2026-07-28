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
  breadcrumbs: BreadcrumbType[];
};

export default function MainContainer({
  heading,
  headingClassName,
  description,
  actions,
  breadcrumbs,
  children,
}: LayoutProps) {
  return (
    <div className="w-full h-screen bg-[#0d0c10] md:p-2 md:pl-0">
      <div className="w-full h-full bg-[#b4abc40d] md:border md:rounded-xl">
        <header className="w-full flex items-center justify-between p-3 px-8">
          <div>
            <Breadcrumb>
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
          </div>
          <div>
            <ThemeToggle />
          </div>
        </header>
        <Separator orientation="horizontal" className=" h-4" />
        <div className="max-w-5xl mx-auto p-6">
          {heading && (
            <PageTitle className={headingClassName}>{heading}</PageTitle>
          )}
          {description && <h3>{description}</h3>}
          {actions}
          {heading && <Separator orientation="horizontal" className="my-4" />}
          {children}
        </div>
      </div>
    </div>
  );
}
