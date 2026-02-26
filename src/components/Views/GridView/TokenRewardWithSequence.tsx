import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import styled from "styled-components";
import { TokenRewardWithSequenceProps } from "../ListView/TokenRewardWithSequence";
import { getNumberOfRemainingToken } from "../../../utilities";

const RewardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 19px;
`;

const SymbolWrapper = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
  font-size: 11px;
  color: #5a5858;
`;

const TippySymbol = styled.span`
  position: relative;
  top: -7px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 15px;
  color: #1b1b1b;
`;

const RemainingTokens = styled.div`
  margin-top: -20px;
  cursor: pointer;
`;

const ImageWrapper = styled.img`
  width: 35px;
  height: 35px;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

export default function TokenRewardWithSequence({
  rewardsWithSequence,
}: TokenRewardWithSequenceProps): JSX.Element {
  const numberOfReamainingTokens = getNumberOfRemainingToken(
    rewardsWithSequence?.length
  );

  return (
    <RewardsWrapper>
      <FlexWrapper>
        {rewardsWithSequence.length > 0 ? (
          rewardsWithSequence?.slice(0, 3)?.map((items, index) => {
            return (
              <div key={index} style={{ marginRight: 50, marginTop: "-30px" }}>
                <div>
                  <ImageWrapper src={items?.icon} alt={items?.symbol} />
                </div>
                <SymbolWrapper>{items?.symbol}</SymbolWrapper>
              </div>
            );
          })
        ) : (
          <div
            style={{
              height: "35px",
              width: "40px",
            }}
          ></div>
        )}
      </FlexWrapper>

      <Tippy
        theme="light"
        placement="bottom"
        content={
          <div>
            {rewardsWithSequence
              ?.slice(3, rewardsWithSequence?.length)
              .map((items, index) => {
                return (
                  <div key={index}>
                    {
                      <div>
                        <img
                          src={items?.icon}
                          width="20px"
                          height="20px"
                          alt={items?.symbol}
                        />
                        <TippySymbol> {items?.symbol}</TippySymbol>
                      </div>
                    }
                  </div>
                );
              })}
          </div>
        }
      >
        {numberOfReamainingTokens && (
          <RemainingTokens>+ {numberOfReamainingTokens}</RemainingTokens>
        )}
      </Tippy>
    </RewardsWrapper>
  );
}
