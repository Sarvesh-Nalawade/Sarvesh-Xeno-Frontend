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

					value: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(profit.value),

				}}

				Icon={icons.Profit}

			/>



			<OverviewCard

				label="Total Products"

				data={{

					...products,

					value: products.value.toLocaleString('en-IN'),

				}}

				Icon={icons.Product}

			/>



			<OverviewCard

				label="Total Customers"

				data={{

					...users,

					value: users.value.toLocaleString('en-IN'),

				}}

				Icon={icons.Users}

			/>

		</div>

	);

}

