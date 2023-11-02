const NightMode = (props) => {
    return (
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1734.89 1762.22" {...props}>
            <path d="M1800.69,1543.3l-154.85-354.44-10.15-10.15A636,636,0,0,0,1723.63,936h-21.76c-83.45,96.53-200.73,156.19-343,156.19C1080.58,1092.18,855,866.56,855,588.25c0-143,74.62-300,174.5-363.34l.36-18.3a636.19,636.19,0,0,0-275.21,92.14l.93-.93L745.22,287.5,390.77,132.64,380.45,143h0L535.31,497.42,545.5,507.6a636.34,636.34,0,0,0-78.37,189.21H452.68L92.56,837.94v14.6h0L452.69,993.67h14.6V991.5a636.35,636.35,0,0,0,78.5,189l-9.81,9.81L381.13,1544.76l10.32,10.33h0L745.9,1400.23l10.32-10.32a636,636,0,0,0,184.91,76.47h-.36V1481l141.13,360.13h14.6L1237.63,1481V1466.8a636.17,636.17,0,0,0,188.31-78l10,10,354.45,154.85,10.32-10.32Z" transform="translate(-92.56 -78.89)"/>
            <polygon points="1505.79 143.96 1626.2 237.67 1505.79 331.38 1388.53 475.34 1271.27 331.38 1150.86 237.67 1271.27 143.96 1388.53 0 1505.79 143.96"/>
            <polygon points="1259.94 536.55 1344.54 602.39 1259.94 668.22 1177.56 769.36 1095.18 668.22 1010.58 602.39 1095.18 536.55 1177.56 435.41 1259.94 536.55"/>
            <polygon points="1673.16 482.93 1734.89 530.97 1673.16 579.01 1613.05 652.81 1552.94 579.01 1491.21 530.97 1552.94 482.93 1613.05 409.13 1673.16 482.93"/>
        </svg>
    )
}

const RightArrow = (props) => {
    return (
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1267.53" {...props}>
            <path d="M160,1593.77h62.33L1760,991.17h0V928.83L222.35,326.23H160Z" transform="translate(-160 -326.23)"/>
        </svg>
    )
}

const LeftArrow = (props) => {
    return (
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1267.53" {...props}>
            <path d="M1760,326.23h-62.33L160,928.83v62.35h0l1537.64,602.6H1760Z" transform="translate(-160 -326.23)"/>
        </svg>
    )
}

export {
    RightArrow,
    LeftArrow,
    NightMode,
}