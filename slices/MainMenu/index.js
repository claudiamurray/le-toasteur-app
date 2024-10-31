import React from "react";
import Link from "next/link";
import Image from "next/image";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import logoBlue from "../../public/images/logos/logo-toasteur-villeray-navy.png";
import classes from "../../components/ui/menu/MainMenu.module.css";

/**
 * @typedef {import("@prismicio/client").Content.MainMenuSlice} MainMenuSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MainMenuSlice>} MainMenuProps
 * @param { MainMenuProps }
 */
const MainMenu = ({ slice }) => (
	<section className={classes["section-main-menu"]}>
		<div className={`${classes["menu-grid"]} ${"container"}`}>
			<div className={classes["box-text"]}>
				<div className={classes["left-side"]}>
					<PrismicRichText field={slice.primary.title} />
					<span>{slice.primary.description}</span>
				</div>
				<div className={classes["right-side-illustration"]}>
					<PrismicNextImage
						field={slice.primary.illustration}
						alt={slice.primary.illustration.alt}
					/>
				</div>
			</div>
			<div className={classes["menu-list"]}>
				{/* ITEM */}

				{slice?.items?.map((item, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<React.Fragment key={i}>
						<div className={classes["item-card"]}>
							<div className={classes["title-row"]}>
								<PrismicRichText field={item.breakfasttitle} />
								<span>{item.price}</span>
							</div>
							<PrismicRichText field={item.description} />
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
		<div className={classes["logo-box"]}>
			<Image
				className={classes["logo-blue-transparent"]}
				src={logoBlue}
				alt="test"
				// layout="fill"
				// width={207}
				// height={106}
			/>
		</div>
	</section>
);

export default MainMenu;
