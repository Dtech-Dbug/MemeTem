import { Control } from "fabric";

export const deleteControl = new Control({
                x: 0.5,
                y: -0.5,
                offsetY: -10,
                offsetX: 10,
                cursorStyle: 'pointer',
                mouseUpHandler: (eventData, transform) => {
                    const canvas = transform.target.canvas;
                    canvas.remove(transform.target);
                    canvas.requestRenderAll();
                    return true;
                },
                render: (ctx, left, top, styleOverride, fabricObject) => {
                    const size = 24;
                    ctx.save();
                    ctx.fillStyle = 'red';
                    ctx.beginPath();
                    ctx.arc(left, top, size / 2, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('×', left, top);
                    ctx.restore();
                },
                cornerSize: 24
            });