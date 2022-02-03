import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";


export const Error404 = () => {
    return <div style={{textAlign: 'center'}}>
        404 page not found
      <NavLink to={'/'}>
          <Button>Return</Button>
      </NavLink>
    </div>
}

