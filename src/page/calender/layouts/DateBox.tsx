import styled from "styled-components";
import { Row } from "@/components/Flex";
import { font } from "@/styles";

const DateBox = () => {
  const date = new Date();
  const [year, month] = [date.getFullYear(), date.getMonth()];

  return (
    <Row gap="8px">
      <YearText>{year}</YearText>
      <MonthText>{month}</MonthText>
    </Row>
  );
};

const YearText = styled.h1`
  ${font.H2};

  &:after {
    content: "년";
  }
`;

const MonthText = styled.h1`
  ${font.H2};

  &:after {
    content: "월";
  }
`;

export default DateBox;
