import style from 'styled-components';

export const RootWrapperGridView = style.div`
display:flex;
justify-content:space-between;
margin-top:40px;
margin-left:6px;
align-items:center;
`;

export const Fillwraper = style.div`
display:flex;
align-items:center;
margin-bottom:0.5rem
`;

export const PricewraperGridView = style.div`
display:flex;
align-items:center;
margin-right: 55px ;
@media (max-width: 376px){ 
    margin-right: 40px ;
}
`;

export const PricewraperListView = style.div`
display:flex;
align-items:center;
margin-right: 0px ;
@media (max-width: 376px){ 
    margin-right: 0px;
}
`;

export const FillNameGridView = style.span`
color:#616161;
font-size:14px;
font-weight:400;
margin-left: -0.2rem;
font-family: Inter;
font-style: normal;
font-weight: normal;
line-height: 24px;
font-size:14px;

`;

export const FillNameListView = style.span`
color:#616161;
font-size:14px;
font-weight:400;
margin-left: 0.5rem;
font-family: Inter;
font-style: normal;
font-weight: normal;
line-height: 24px;
font-size:14px;

`;



export const Price = style.span<{
  marginRight: string;
}>`
    color:#212121;
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    margin-left: ${(props) => props.marginRight};
    @media (max-width: 425px) {
        font-size: 18px;
      }

`;

export const CircularPoolFilledWrapper = style.div`
  width: 35px;
  height: 35px;
  margin-right:5px;
  margin-top: 0.3rem;
 
`;