import styled from "styled-components";
import useUser from "@/hooks/useUser";
import { Row } from "@/components/Flex";
import InfomationBox from "./InfomationBox";
import MeisterBox from "./MeisterBox";
import JoinCheckBox from "./JoinCheckBox";

const Aside = () => {
  const { user, isLogined } = useUser();

  return (
    <Container>
      <InfomationBox user={user} isLogined={isLogined} />
      {isLogined && (
        <Row gap="6px">
          <MeisterBox />
          <JoinCheckBox />
        </Row>
      )}
    </Container>
  );
};

const Container = styled.aside`
  width: 30vw;
  display: flex;
  gap: 6px;
  margin-left: auto;
  flex-direction: column;

  @media screen and (max-width: 900px) {
    width: 28vw;
  }

  @media screen and (max-width: 800px) {
    width: 24vw;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default Aside;
