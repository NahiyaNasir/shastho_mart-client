
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navber";
import { userService } from "@/service/userServise";

export default async function CommonLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {
   const { data } = await userService.getSession();
  return (
  
    <div>
    <Navbar  user={data?.user ?? null}/>
      {children}
      <Footer />
    </div>
  );
}