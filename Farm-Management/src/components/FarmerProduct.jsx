import * as z from "zod";
import styled from "styled-components";
import {Leaf, Apple, Wheat } from "lucide-react";

const farmerProductsSchema = z.object({
  productName: z.string(),
  type: z.enum(["fruit", "vegetable", "grain"], {
    errorMap: () => ({
      message: "Type must be either 'fruit', 'vegetable', or 'grain'",
    }),
  }),
  quantityAvailable: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive({ message: "Quantity must be a positive number" })
    .min(1, "minimum quantity should be 1")
    .max(10, "maximum quantity should be 10")
});

const VgetableIcon = ({ color }) => <Leaf color={color} />;
const FruitIcon = ({ color }) => <Apple color={color} />;
const GrainIcon = ({ color }) => <Wheat color={color} />;

const TYPE_CONFIG = { 
  fruit: { label: "Fruit", color: "#d51010", Icon: FruitIcon },
  vegetable: { label: "Vegetable", color: "#48bb21", Icon: VgetableIcon },
  grain: { label: "Grain", color: "#C6981F", Icon: GrainIcon },
};

const Card = styled.div`
  font-family: "Work Sans", sans-serif;
  width: 320px;
  background: #f1e9d2;
  border-radius: 14px;
  overflow: hidden;

  border: 1px solid #dccfa6;
  box-shadow: 0 8px 20px rgba(31, 61, 46, 0.14);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px rgba(31, 61, 46, 0.22);
  }
`;

const Header = styled.div`
  background: #1f3d2e;
  padding: 20px 24px 18px;
`;

const TypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${(p) => p.$color}26;
  color: ${(p) => p.$color};
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

const Name = styled.h2`
  font-family: "Fraunces", serif;
  font-size: 21px;
  font-weight: 600;
  color: #f1e9d2;
  margin: 10px 0 0;
`;

const GoldLine = styled.div`
  height: 3px;
  width: 40px;
  background: #c6981f;
  border-radius: 2px;
  margin-top: 14px;
`;

const Body = styled.div`
  padding: 18px 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const QuantityNumber = styled.span`
  font-family: "Fraunces", serif;
  font-size: 32px;
  font-weight: 600;
  color: #1f3d2e;
  line-height: 1;
`;

const QuantityUnit = styled.span`
  color: #6b4226;
  font-size: 14px;
`;

const GaugeTrack = styled.div`
  height: 6px;
  width: 100%;
  background: #e2d6ae;
  border-radius: 999px;
  overflow: hidden;
`;

const GaugeFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: ${(p) => p.$color};
  width: ${(p) => p.$percent}%;
`;



const ErrorCard = styled.div`
  font-family: "Work Sans", sans-serif;
  width: 320px;
  background: #f7e9e4;
  border: 1px solid #d9b3a8;
  border-radius: 14px;
  padding: 18px 22px;
`;

const ErrorTitle = styled.p`
  color: #8c3a26;
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 6px;
`;

const ErrorMessage = styled.p`
  color: #8c3a26;
  font-size: 13px;
  margin: 2px 0;
`;



const FarmProduct = ({ productName, type, quantityAvailable }) => {
  const result = farmerProductsSchema.safeParse({
    productName,
    type,
    quantityAvailable,
  });

  if (!result.success) {
    return (
      <ErrorCard>
        <ErrorTitle>Couldn't display this product</ErrorTitle>
        {result.error.issues.map((issue, i) => (
          <ErrorMessage key={i}>{issue.message}</ErrorMessage>
        ))}
      </ErrorCard>
    );
  }

  const product = result.data;
  const config = TYPE_CONFIG[product.type];
  const percent = Math.min(100, (product.quantityAvailable / 10) * 100);

  return (
    <Card>
        <Header>
          <TypeBadge $color={config.color}>
            <config.Icon color={config.color} />
            {config.label}
          </TypeBadge>
          <Name>{product.productName}</Name>
          <GoldLine />
        </Header>
        <Body>
          <QuantityRow>
            <QuantityNumber>{product.quantityAvailable}</QuantityNumber>
            <QuantityUnit>kg available</QuantityUnit>
          </QuantityRow>
          <div>
            <GaugeTrack>
              <GaugeFill $color={config.color} $percent={percent} />
            </GaugeTrack>
          
          </div>
        </Body>
    </Card>
  );
};

export default FarmProduct;