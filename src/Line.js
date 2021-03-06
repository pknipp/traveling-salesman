import React from "react";

const Line = ({ xi, yi, zi, xf, yf, zf, d, which, nx, nyz, dashed }) => {
    // apparent diameters of planets at either end of line
    let di = nyz * d * (which ? 1 : -1) / zi;
    let df = nyz * d * (which ? 1 : -1) / zf;

    //convert from actual lateral coordinates to apparent later coordinates
    let Xi = nx/2 + nyz * (xi - nx/2)/zi;
    let Yi = nyz/2+ nyz * (yi - nyz/2)/zi;
    let Xf = nx/2 + nyz * (xf - nx/2)/zf;
    let Yf = nyz/2+ nyz * (yf - nyz/2)/zf;

    // I choose the offset (0.5) so that the lines will be tangent to the planets
    let offi = di / 2;
    let offf = df / 2;
    let doff = offf - offi;
    // The following two lines represent the two sides of a right triangle.
    const dX = Xf - Xi;
    const dY = Yf - Yi;

    // Pythagorean theorem
    const R = Math.sqrt(dX * dX + dY * dY);
    const R2= Math.sqrt(R*R - doff * doff);
    // "TOA" part of "SOHCAHTOA"
    let angle = Math.atan2(dY, dX);
    const angle2= Math.atan2(doff, R2);
    angle -= angle2;
    return (
        <div className="line" style={{
            width:`${R2}px`,
            left: `${Xi - R2 / 2 + (di / 2) * Math.sin(angle)}px`,
            top: `${Yi - (di / 2) * Math.cos(angle)}px`,
            transform: `rotate(${angle * 180 / Math.PI}deg) translateX(${R2 / 2}px)`,
            borderTopStyle: `${dashed ? "dashed" : "solid"}`,
            zIndex: `${dashed ? 0 : -(zi + zf) / 2}`
        }}/>
    )
}
export default Line;
