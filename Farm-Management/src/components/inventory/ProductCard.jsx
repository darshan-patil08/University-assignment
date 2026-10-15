import styled from "styled-components";
import {
  Leaf,
  Apple,
  Wheat,
  FlaskConical,
  Thermometer,
  Calendar,
  IndianRupee,
  Package,
  BadgeCheck,
  Sprout,
} from "lucide-react";

/* ─────────────── Type config ─────────────── */
const TYPE_CONFIG = {
  grain: { label: "Grain", color: "#c6981f", Icon: Wheat },
  vegetable: { label: "Vegetable", color: "#3a8f40", Icon: Leaf },
  fruit: { label: "Fruit", color: "#c0392b", Icon: Apple },
};

/* ─────────────── Styled components ─────────────── */
const Card = styled.article`
  font-family: "Work Sans", sans-serif;
  background: #f1e9d2;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #dccfa6;
  box-shadow: 0 6px 18px rgba(31, 61, 46, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(31, 61, 46, 0.18);
  }
`;

const CardHeader = styled.div`
  background: #1f3d2e;
  padding: 18px 22px 16px;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
`;

const TypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: ${(p) => p.$color}22;
  color: ${(p) => p.$color};
  border: 1px solid ${(p) => p.$color}55;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const OrgBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #c6981f22;
  color: #c6981f;
  border: 1px solid #c6981f55;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
`;

const ProductName = styled.h3`
  font-family: "Fraunces", serif;
  font-size: 20px;
  font-weight: 600;
  color: #f1e9d2;
  margin: 0;
  line-height: 1.2;
`;

const FarmerId = styled.p`
  font-size: 11px;
  color: #a3b8a7;
  margin: 4px 0 0;
  letter-spacing: 0.05em;
`;

const GoldLine = styled.div`
  height: 2px;
  width: 36px;
  background: #c6981f;
  border-radius: 2px;
  margin-top: 12px;
`;

const CardBody = styled.div`
  padding: 16px 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #3a2e1e;

  svg {
    flex-shrink: 0;
    color: #1f3d2e;
    opacity: 0.7;
  }
`;

const RowLabel = styled.span`
  color: #8a7559;
  font-weight: 500;
  min-width: 80px;
`;

const RowValue = styled.span`
  color: #2c1f10;
  font-weight: 500;
`;

const Divider = styled.div`
  height: 1px;
  background: #dccfa6;
  margin: 4px 0;
`;

const NotesText = styled.p`
  font-size: 12px;
  color: #6b5635;
  font-style: italic;
  margin: 0;
  line-height: 1.5;
  border-left: 3px solid #c6981f;
  padding-left: 10px;
`;

const QuantityBar = styled.div`
  width: 100%;
  height: 5px;
  background: #e2d6ae;
  border-radius: 999px;
  overflow: hidden;
  margin-top: 2px;
`;

const QuantityFill = styled.div`
  height: 100%;
  background: ${(p) => p.$color};
  width: ${(p) => Math.min(100, (p.$qty / 1000) * 100)}%;
  border-radius: 999px;
  transition: width 0.5s ease;
`;

/* ─────────────── Component ─────────────── */
const ProductCard = ({ product }) => {
  const cfg = TYPE_CONFIG[product.category] || TYPE_CONFIG.grain;
  const { Icon } = cfg;

  return (
    <Card>
      <CardHeader>
        <HeaderTop>
          <TypeBadge $color={cfg.color}>
            <Icon size={11} />
            {cfg.label}
          </TypeBadge>
          {product.organicCertification && (
            <OrgBadge>
              <BadgeCheck size={11} />
              Organic
            </OrgBadge>
          )}
        </HeaderTop>
        <ProductName>{product.productName}</ProductName>
        <FarmerId>Farmer ID: {product.farmerId}</FarmerId>
        <GoldLine />
      </CardHeader>

      <CardBody>
        {/* Quantity */}
        <Row>
          <Package size={14} />
          <RowLabel>Quantity</RowLabel>
          <RowValue>
            {product.quantity} {product.unit}
          </RowValue>
        </Row>
        <QuantityBar>
          <QuantityFill $color={cfg.color} $qty={product.quantity} />
        </QuantityBar>

        <Divider />

        {/* Price */}
        <Row>
          <IndianRupee size={14} />
          <RowLabel>Price/Unit</RowLabel>
          <RowValue>₹{product.pricePerUnit}</RowValue>
        </Row>

        {/* Harvest Date */}
        <Row>
          <Calendar size={14} />
          <RowLabel>Harvested</RowLabel>
          <RowValue>
            {new Date(product.harvestDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </RowValue>
        </Row>

        {/* Storage */}
        <Row>
          <Thermometer size={14} />
          <RowLabel>Storage</RowLabel>
          <RowValue>{product.storageConditions}</RowValue>
        </Row>

        {/* Pesticide */}
        <Row>
          <FlaskConical size={14} />
          <RowLabel>Pesticide</RowLabel>
          <RowValue
            style={{ color: product.pesticideUse === "None" ? "#3a8f40" : "#c0392b" }}
          >
            {product.pesticideUse === "None" ? "None used" : "Used"}
          </RowValue>
        </Row>

        <Divider />

        {/* Notes */}
        {product.notes && (
          <Row style={{ alignItems: "flex-start" }}>
            <Sprout size={14} style={{ marginTop: 2 }} />
            <NotesText>{product.notes}</NotesText>
          </Row>
        )}
      </CardBody>
    </Card>
  );
};

export default ProductCard;
