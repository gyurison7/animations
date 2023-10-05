import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  position: absolute;
  bottom: 80px;
  width: 60px;
  height: 30px;
  background-color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 5px;
  font-weight: 600;
`;

const boxVariants = {
  box1: { scale: 1.2, transformOrigin: "right bottom" }, // 오른쪽 아래 고정, 즉 왼쪽 위 방향으로 커짐
  box4: { scale: 1.2, transformOrigin: "left top" }, // 왼쪽 위 고정, 즉 오른쪽 아래 방향으로 커짐
};

const overlayVariants = {
  initial: { backgroundColor: "rgba(0, 0, 0, 0)" },
  animate: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const centerBoxVariants = {
  initial: { backgroundColor: "rgba(255, 255, 255, 0.5)" },
  animate: { backgroundColor: "rgba(255, 255, 255, 1)" },
  exit: { backgroundColor: "rgba(255, 255, 255, 0.5)" },
};

const buttonVariants = {
  clickTrue: { width: "65px", height: "35px", color: "rgb(247, 159, 31)" },
  clickFalse: { width: "60px", height: "30px", color: "rgb(6, 82, 221)" },
};

function App() {
  const [id, setId] = useState<string | null>(null);
  const [click, setClick] = useState(false);
  const toggleClick = () => setClick((prev) => !prev);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            variants={boxVariants}
            whileHover={n === "1" ? "box1" : n === "4" ? "box4" : "scale: 1"}
          >
            {n === "2" && !click ? <Circle layoutId="circle" /> : null}
            {n === "3" && click ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id && (
          <Overlay
            onClick={() => setId(null)}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Box
              layoutId={id}
              variants={centerBoxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </Overlay>
        )}
        <Button
          onClick={toggleClick}
          variants={buttonVariants}
          animate={click ? "clickTrue" : "clickFalse"}
        >
          Switch
        </Button>
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
