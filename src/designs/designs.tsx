import DesignInterface from '../components/interfaces/DesignInterface'

import btw21 from './btw21/design'
import classic from './classic/design'
import classiceu from './classic-eu/design'
import gp2024 from './gp2024/design'

const designs:Record<string,DesignInterface> = {
    "classic": classic,
    "btw21": btw21,
    "classic-eu": classiceu,
    "gp2024": gp2024
}
export default designs
