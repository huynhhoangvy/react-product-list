import React, { FC } from 'react';
import { DisplayedProductProps } from 'types/PropsTypes';

const formatPrice = (num: number): number => {
	if ( num === Number(num.toFixed()) ) return num;
	return Number((Math.round(num * 100) / 100).toFixed(2));
};

const Item: FC<DisplayedProductProps> = ({ name, price, thumbnail, discount }) => {
	return (
		<li className="product__item">
			<img src={thumbnail} alt={name} />
			<div>
				<h3>{name}</h3>
				<div className="product__price">
					<s>{formatPrice(price)}$</s><span>-{discount}%</span>
					<strong>{formatPrice(price * (100 - discount) / 100)}$</strong>
				</div>
			</div>
		</li>
	);
};

export default Item;
