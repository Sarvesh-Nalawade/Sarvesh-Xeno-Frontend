import { compactFormat } from "@/lib/format-number";

import { getOverviewData } from "../../fetch";

import { OverviewCard } from "./card";

import * as icons from "./icons";



export async function OverviewCardsGroup() {

	const { profit, products, users } = await getOverviewData();



	return (

		<div className="grid gap-4 sm:gap-6 lg:grid-cols-3 2xl:gap-7.5">

			<OverviewCard

				label="Total Revenue"

				data={{

					...profit,

					value: "₹ " + compactFormat(profit.value),

				}}

				Icon={icons.Profit}

			/>



			<OverviewCard

				label="Total Products"

				data={{

					...products,

					value: compactFormat(products.value),

				}}

				Icon={icons.Product}

			/>



			<OverviewCard

				label="Total Customers"

				data={{

					...users,

					value: compactFormat(users.value),

				}}

				Icon={icons.Users}

			/>

		</div>

	);

}

