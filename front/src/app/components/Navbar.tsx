"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import useAuthStore from "@/stores/useAuthStore";
import { getUserProfile } from "@/apis/profile";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = useAuthStore();
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(!!session);
  }, [session, setIsLoggedIn]);

  // 프로필 정보 확인
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLoggedIn) {
        try {
          const profileData = await getUserProfile();
          setUserInfo(profileData);
          console.log("유저 프로필:", profileData);
        } catch (error) {
          console.error("유저 프로필 가져오기 실패:", error);
        }
      }
    };

    fetchUserProfile();
  }, [isLoggedIn, setUserInfo]);

  const isActive = (path: string) =>
    pathname === path || (path === "/" && pathname === "/gatherings")
      ? "text-gray-900"
      : "text-[#FFF7ED]";

  return (
    <nav className="h-14 md:max-h-[60px] bg-[rgb(234,88,12)] text-base font-semibold text-[#FFF7ED] border-b-2 border-[#111827] flex justify-center">
      <div className="flex w-[1200px] h-full items-center justify-between px-4">
        <section className="flex md:gap-5 gap-3 items-center">
          <div className="hidden md:block">
            <Link href="/" aria-label="Go to homepage">
              <Image
                width={73}
                height={35}
                alt="Site Logo Text"
                src="/images/logo-text.svg"
              />
            </Link>
          </div>
          <div className="md:hidden">
            <Link href="/" aria-label="Go to homepage">
              <Image
                width={56}
                height={27}
                alt="Site Logo Text"
                src="/images/logo-text-small.svg"
              />
            </Link>
          </div>

          <div className="flex pt-[2px] md:gap-6 gap-3">
            <div>
              <Link href="/" className={isActive("/")}>
                모임 찾기
              </Link>
            </div>
            <div>
              <Link href="/#" className={isActive("/#")}>
                찜한 모임
              </Link>
            </div>
            <div>
              <Link href="/reviews" className={isActive("/reviews")}>
                모든 리뷰
              </Link>
            </div>
          </div>
        </section>

        <section>
          {!isLoggedIn ? (
            <button onClick={() => signIn()}>로그인</button>
          ) : (
            <div className="relative">
              <div>
                <Menu as="div">
                  <Menu.Button className="flex items-center">
                    <Image
                      width={40}
                      height={40}
                      alt="profile"
                      src={userInfo?.image || "/images/profile.svg"}
                      className="border-2 border-gray-200 rounded-full"
                    />
                  </Menu.Button>
                  <Menu.Items className="max-w-full absolute left-auto right-0 lg:mt-2 mt-[6px] lg:min-w-[142px] min-h-[80px] min-w-[110px] p-1 rounded-2xl flex flex-col items-start justify-start bg-white border border-gray-4 shadow-custom text-[#1F2937]">
                    <Link href="/mypage">
                      <Menu.Item
                        as="button"
                        className="lg:px-4 px-3 py-[10px] w-full text-start"
                      >
                        마이페이지
                      </Menu.Item>
                    </Link>
                    <Link href="/#">
                      <Menu.Item
                        as="button"
                        onClick={() => signOut()}
                        className="lg:px-4 px-3 py-[10px] w-full text-start"
                      >
                        로그아웃
                      </Menu.Item>
                    </Link>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          )}
        </section>
      </div>
    </nav>
  );
}
