"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

import { useEffect, useState } from "react";
import { CameraIcon } from "./_components/icons";

// Define the Owner type based on the backend model
interface Owner {
	owner: string;
	name: string;
}

export default function Page() {
	const [ownerData, setOwnerData] = useState<Owner[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [data, setData] = useState({
		profilePhoto: "/images/user/user-03.png",
		coverPhoto: "/images/cover/cover-01.png",
	});

	useEffect(() => {
		const fetchOwnerDetails = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get-shop-details`, {
					credentials: "include", // Important to send the auth cookie
				});

				if (!res.ok) {
					throw new Error(`Failed to fetch shop details: ${res.statusText}`);
				}

				const data = await res.json();
				setOwnerData(data);
			} catch (e: any) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		fetchOwnerDetails();
	}, []);

	const handleChange = (e: any) => {
		if (e.target.name === "profilePhoto") {
			const file = e.target?.files[0];

			setData({
				...data,
				profilePhoto: file && URL.createObjectURL(file),
			});
		} else if (e.target.name === "coverPhoto") {
			const file = e.target?.files[0];

			setData({
				...data,
				coverPhoto: file && URL.createObjectURL(file),
			});
		}
	};

	return (
		<div className="mx-auto w-full max-w-[970px]">
			<Breadcrumb pageName="Profile" />

			<div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
				<div className="relative z-20 h-35 md:h-65">
					<Image
						src={data?.coverPhoto}
						alt="profile cover"
						className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
						width={970}
						height={260}
						style={{
							width: "auto",
							height: "auto",
						}}
					/>
				</div>
				<div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
					<div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
						<div className="relative drop-shadow-2">
							{data?.profilePhoto && (
								<>
									<Image
										src={data?.profilePhoto}
										width={160}
										height={160}
										className="overflow-hidden rounded-full"
										alt="profile"
									/>

									<label
										htmlFor="profilePhoto"
										className="absolute bottom-0 right-0 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
									>
										<CameraIcon />

										<input
											type="file"
											name="profilePhoto"
											id="profilePhoto"
											className="sr-only"
											onChange={handleChange}
											accept="image/png, image/jpg, image/jpeg"
										/>
									</label>
								</>
							)}
						</div>
					</div>
					<div className="mt-4">
						{loading && <p>Loading...</p>}
						{error && <p className="text-red-500">Error: {error}</p>}
						{ownerData && ownerData.length > 0 && (
							<>
								<h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
									{ownerData[0].owner}
								</h3>
								<p className="font-medium">{ownerData[0].name}</p>
							</>
						)}

						<div className="mx-auto max-w-[720px]">
							<h4 className="mt-4 font-medium text-dark dark:text-white">
								About Me
							</h4>
							<p className="mt-4">


								Welcome to my store! 🌟 I focus on bringing simple, quality products that make everyday life easier and better. Each item is carefully chosen with practicality and style in mind. My goal is to give you a smooth shopping experience and products you’ll truly love.


							</p>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}
