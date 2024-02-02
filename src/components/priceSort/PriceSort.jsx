import { Range, getTrackBackground } from "react-range";

const PriceSort = ({
  values,
  setValues,
  rtl,
  setPriceMin,
  setPriceMax,
  priceMin,
  priceMax,
}) => {
  const STEP = 1;
  const MIN = 0;
  const MAX = 200;

  console.log("PriceMin=", priceMin);
  console.log("PriceMax=", priceMax);

  return (
    <div>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => {
          setValues(values);
          setPriceMin(values[0]);
          setPriceMax(values[1]);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "300px",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            {/* <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            /> */}
          </div>
        )}
      />
      <output style={{ marginTop: "30px" }} id="output">
        {values[0].toFixed(0)} - {values[1].toFixed(0)}
      </output>
    </div>
  );
};

export default PriceSort;
