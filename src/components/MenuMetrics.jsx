import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import * as selectors from "../store/selectors";

import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    paddingRight: theme.spacing(1)
  },
  unit: {
    flexShrink: 0,
    width: "2rem"
  }
}));

export const MenuMetrics = props => {
  const classes = useStyles();
  const best = useSelector(selectors.selectBestCostDisplay);
  const evaluating = useSelector(selectors.selectEvaluatingCostDisplay);
  const startedRunningAt = useSelector(selectors.selectStartedRunningAt);
  const [runningFor, setRunningFor] = useState(0);

  useEffect(() => {
    if (startedRunningAt) {
      const interval = setInterval(() => {
        setRunningFor(Math.floor((Date.now() - startedRunningAt) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startedRunningAt]);

  return (
    <MenuSection>
      <MenuItem row>
        <Grid item container justify="space-between">
          <Typography
            display="inline"
            variant="button"
            color="textSecondary"
            component="div"
          >
            Total Distance:{" "}
          </Typography>
          <Typography
            classes={{ root: classes.grow }}
            align="right"
            display="inline"
            variant="button"
          >
            {evaluating}
          </Typography>
          <Typography
            classes={{ root: classes.unit }}
            align="right"
            display="inline"
            variant="button"
          >
            km
          </Typography>
        </Grid>

        <Grid item container justify="space-between">
          <Typography
            display="inline"
            variant="button"
            color="textSecondary"
            component="div"
          >
            Travel time (Approx):{" "}
          </Typography>
          <Typography
            classes={{ root: classes.grow }}
            align="right"
            display="inline"
            variant="button"
          >
            {Math.ceil(evaluating/50) || ""}
          </Typography>
          <Typography
            classes={{ root: classes.unit }}
            align="right"
            display="inline"
            variant="button"
          >
            hr
          </Typography>
          <i>*travel time is calculated in accordance with average economy speed ie 50KMPH.</i>
        </Grid>
      </MenuItem>
    </MenuSection>
  );
};
