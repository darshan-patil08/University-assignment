import * as z from "zod";
import styled from "styled-components";
import { MapPin } from "lucide-react";


const farmerSchema = z.object({
  farmerName: z.string(),
  age: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }),
  farmLocation: z.string().optional(),
});

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

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #c6981f;
  color: #1f3d2e;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Name = styled.h2`
  font-family: "Fraunces", serif;
  font-size: 21px;
  font-weight: 600;
  color: #f1e9d2;
  margin: 2px 0 0;
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
  gap: 16px;
`;

const AgeStat = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding-bottom: 14px;
  border-bottom: 1px solid #dccfa6;
`;

const AgeNumber = styled.span`
  font-family: "Fraunces", serif;
  font-size: 32px;
  font-weight: 600;
  color: #1f3d2e;
  line-height: 1;
`;

const AgeLabel = styled.span`
  color: #6b4226;
  font-size: 13px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.span`
  color: #6b4226;
  font-size: 13px;
  font-weight: 500;
`;

const LocationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #e7dcb8;
  color: #4a3418;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
`;

const MutedValue = styled.span`
  color: #a89873;
  font-size: 13px;
  font-style: italic;
`;


const FarmerDetails = ({ farmerName, age, farmLocation }) => {
  const farmer = farmerSchema.parse({ farmerName, age, farmLocation });

  const initials = farmer.farmerName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
      <Card>
        <Header>
          <HeaderRow>
            <Avatar>{initials}</Avatar>
            <div>
              <Name>{farmer.farmerName}</Name>
            </div>
          </HeaderRow>
          <GoldLine />
        </Header>

        <Body>
          <AgeStat>
            <AgeNumber>{farmer.age}</AgeNumber>
            <AgeLabel>years old</AgeLabel>
          </AgeStat>

          <Row>
            <Label>Farm Location</Label>
            {farmer.farmLocation ? (
              <LocationBadge>
                <MapPin size={16} />
                
                {farmer.farmLocation}
              </LocationBadge>
            ) : (
              <MutedValue>Not specified</MutedValue>
            )}
          </Row>
        </Body>
      </Card>
  );
};

export default FarmerDetails;