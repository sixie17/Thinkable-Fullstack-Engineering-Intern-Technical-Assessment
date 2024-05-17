import Image from "next/image";
import Link from "next/link";
import { type Posts } from "@/type";
import { useRouter } from "next/navigation";
function Card({ item }: { item: Posts }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(
          `/read/${item.title.toLowerCase().trim().split(" ").join("-")}`
        );
      }}
      className=" cursor-pointer max-w-full m-2 sm:m-0 bg-gray-100 shadow-sm dark:bg-gray-800 transition-all ease-in-out duration-300 hover:shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] rounded-md dark:hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
    >
      {/* <Image
        className="rounded-lg p-3"
        width={1000}
        height={324}
        src={item.image}
        alt=" demo image "
      /> */}

      <div className="p-3">
        <div className="flex mb-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {" "}
            Mar 10, 2023{" "}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mx-1"> , </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {" "}
            5 min read{" "}
          </p>
        </div>

        <h1 className="text-lg ">{item.title}</h1>
      </div>
    </div>
  );
}

export default Card;
