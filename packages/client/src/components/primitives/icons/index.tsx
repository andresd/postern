import { IconBaseProps } from 'react-icons'
import { BiChevronDown, BiChevronUp, BiSearch, BiX } from 'react-icons/bi'
import { IoAddCircleSharp, IoCheckmark, IoCloudDownloadOutline, IoCloudUploadOutline, IoEye, IoEyeOff, IoSync, IoTrashOutline } from 'react-icons/io5'
import { VscCircleFilled, VscDebugRerun, VscInfo, VscWarning } from 'react-icons/vsc'

export type IconNames = 'add' | 'circle' | 'check' | 'chevron-down' | 'chevron-up' | 'clear' | 'debug-rerun' | 'download' | 'eye' | 'eye-off' | 'info' | 'search' | 'sync' | 'trash' | 'upload' | 'warning'

type IconProps = {
  name: IconNames
} & IconBaseProps

export const Icon = (props: IconProps) => {
  const { name, ...rest } = props

  switch (name) {
    case 'add':
      return <IoAddCircleSharp {...rest} />
    case 'circle':
      return <VscCircleFilled {...rest} />
    case 'check':
      return <IoCheckmark {...rest} />
    case 'chevron-down':
      return <BiChevronDown {...rest} />
    case 'chevron-up':
      return <BiChevronUp {...rest} />
    case 'clear':
      return <BiX {...rest} />
    case 'debug-rerun':
      return <VscDebugRerun {...rest} />
    case 'download':
      return <IoCloudDownloadOutline {...rest} />
    case 'upload':
      return <IoCloudUploadOutline {...rest} />
    case 'eye':
      return <IoEye {...rest} />
    case 'eye-off':
      return <IoEyeOff {...rest} />
    case 'info':
      return <VscInfo {...rest} />
    case 'search':
      return <BiSearch {...rest} />
    case 'sync':
      return <IoSync {...rest} />
    case 'trash':
      return <IoTrashOutline {...rest} />
    case 'warning':
      return <VscWarning {...rest} />
  }
}
