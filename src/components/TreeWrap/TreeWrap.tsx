import { computed, defineComponent, reactive, watchEffect, type PropType } from 'vue'
import { isArray, isObject, getType } from '@/utils/utils'
import IconMinus from '@/components/CommonIcon/IconMinus'
import IconPlus from '@/components/CommonIcon/IconPlus'
import './styles.less'

export interface NodeDataType {
  key: string
  data: any
  level: number
  showComma: boolean
  path: string
  itemsLen: number
  isClosed: boolean
  canClick: boolean
}

export default defineComponent({
  name: 'TreeWrap',

  props: {
    json: {
      required: true,
      type: Object,
      default: () => ({})
    },
    deep: {
      type: Number,
      default: 4
    },
    showLength: {
      type: Boolean,
      default: true
    },
    showLine: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showDoubleQuotes: {
      type: Boolean,
      default: true
    },
    rootPath: {
      type: String,
      default: 'root'
    },
    collapsedOnClickBrackets: {
      type: Boolean,
      default: true
    },
    renderNodeKey: {
      type: Function as PropType<
        (opt: { node: NodeDataType; defaultKey: string | JSX.Element }) => unknown
      >
    },
    renderNodeValue: {
      type: Function as PropType<
        (opt: { node: NodeDataType; defaultValue: string | JSX.Element }) => unknown
      >
    },
    nodeClick: {
      type: Function as PropType<
        (opt: { isClosed: Boolean, path: String }) => unknown
      >
    }
  },

  setup(props, { emit, slots }) {
    const state = reactive({
      // 关闭状态的路径
      closedPath: {} as any
    })
    
    // const closedPath = computed(() => {
    //   if (props.deep) {
        
    //   }
    // })

    const pathOutDeep = (path: string) => {
      if (props.deep) {
        return path.split('[').length >= props.deep
      }
      return false
    }

    const handleIconClick = (isClosed: boolean, path: string) => {
      props.nodeClick && props.nodeClick({isClosed, path});
      state.closedPath = {
        ...state.closedPath,
        [path]: !isClosed
      }
    }

    const renderIcon = (isClosed: boolean, path: string) => {
      return (
        <span class="icon-wrap" onClick={() => handleIconClick(isClosed, path)}>
          {isClosed ? <IconPlus /> : <IconMinus />}
        </span>
      )
    }

    const defaultKey = (key: string) => (
      <span class={['node-key']}>
        {`${props.showDoubleQuotes && '"'}${key}${props.showDoubleQuotes && '"'}:${' '}${' '}`}
      </span>
    )

    const renderKey = ({
      key,
      data,
      level,
      showComma,
      path,
      itemsLen,
      isClosed,
      canClick
    }: NodeDataType) => {
      if (props.renderNodeKey) {
        return props.renderNodeKey({
          node: {
            key,
            data,
            level,
            showComma,
            path,
            itemsLen,
            isClosed,
            canClick
          }, 
          defaultKey: defaultKey(key)
        })
      }
      return defaultKey(key);
    }

    const defaultValue = (value: any) => {    
      if (value === null) {
        value = 'null';
      } else if (value === undefined) {
        value = 'undefined';
      }
      return getType(value) === 'string' ? `${isBracket(value) ? '' : props.showDoubleQuotes && '"'}${value}${isBracket(value) ? '' : props.showDoubleQuotes && '"'}` : value + '';
    }

    const renderValue = ({
      key,
      data,
      level,
      showComma,
      path,
      itemsLen,
      isClosed,
      canClick
    }: NodeDataType) => {
      if (props.renderNodeValue) {
        return props.renderNodeValue({
          node: {
            key,
            data,
            level,
            showComma,
            path,
            itemsLen,
            isClosed,
            canClick
          }, 
          defaultValue: defaultValue(data)
        })
      }
      return defaultValue(data);
    }

    const isBracket = (string: string) => (['{', '}', '[', ']', '[ . . . ]', '{ . . . }'].includes(string))

    const renderItem = ({
      key,
      data,
      level,
      showComma,
      path,
      itemsLen,
      isClosed,
      canClick
    }: NodeDataType) => {
      return (
        <div
          class={['item-wrap', level > 0 && 'need-indent', props.collapsedOnClickBrackets && canClick && 'item-wrap-click']}
          onClick={() => props.collapsedOnClickBrackets && canClick && handleIconClick(isClosed, path)}
        >
          {key && renderKey({
            key,
            data,
            level,
            showComma,
            path,
            itemsLen,
            isClosed,
            canClick
          })}
          <span
            class={[
              'node-content',
              isBracket(data) ? '' : getType(data)
            ]}
          >
            {renderValue({
              key,
              data,
              level,
              showComma,
              path,
              itemsLen,
              isClosed,
              canClick
            })}
          </span>
          {showComma && <span>{','}</span>}
          {props.showLength && !!itemsLen && <span class="items-length">{`${itemsLen} items`}</span>}
        </div>
      )
    }

    const renderContent = ({
      // 键值
      key = '',
      // json数据
      data,
      // 层级
      level = 0,
      // 是否显示逗号
      showComma = false,
      // 路径
      path = props.rootPath || 'root'
    }: any) => {
      const isClosed = state.closedPath[path] === undefined ? pathOutDeep(path) : state.closedPath[path]
      let itemsLen = 0
      if (isArray(data)) {
        const dataLen = data.length
        if (isClosed) {
          itemsLen = dataLen
        }
        return (
          <div class={['content-wrap', props.showLine && level > 0 && 'need-border', level > 1 && 'need-indent']}>
            {props.showIcon && renderIcon(isClosed, path)}
            {isClosed ? (
              <>
                {renderItem({
                  key,
                  data: '[ . . . ]',
                  level,
                  showComma: true,
                  path,
                  itemsLen,
                  isClosed,
                  canClick: true
                })}
              </>
            ) : (
              <>
                {renderItem({
                  key,
                  data: '[',
                  level,
                  showComma: false,
                  path,
                  itemsLen,
                  isClosed,
                  canClick: true
                })}
                {data.map((item: any, ind: number) => {
                  return renderContent({
                    key: '',
                    data: item,
                    level: level + 1,
                    showComma: ind !== dataLen - 1,
                    path: `${path}[${ind}]`
                  })
                })}
                {renderItem({
                  key: '',
                  data: ']',
                  level,
                  showComma,
                  path,
                  itemsLen,
                  isClosed,
                  canClick: false
                })}
              </>
            )}
          </div>
        )
      }
      if (isObject(data)) {
        const keys = Object.keys(data)
        const dataLen = keys.length
        if (isClosed) {
          itemsLen = dataLen
        }
        return (
          <div class={['content-wrap', props.showLine && level > 0 && 'need-border', level > 1 && 'need-indent']}>
            {props.showIcon && renderIcon(isClosed, path)}
            {isClosed ? (
              <>
                {renderItem({
                  key,
                  data: '{ . . . }',
                  level,
                  showComma: true,
                  path,
                  itemsLen: dataLen,
                  isClosed,
                  canClick: true
                })}
              </>
            ) : (
              <>
                {renderItem({
                  key,
                  data: '{',
                  level,
                  showComma: false,
                  path,
                  itemsLen,
                  isClosed,
                  canClick: true
                })}
                {keys.map((objKey: any, ind: number) => {
                  return renderContent({
                    key: objKey,
                    data: data[objKey],
                    level: level + 1,
                    showComma: ind !== dataLen - 1,
                    path: `${path}[${ind}]`
                  })
                })}
                {renderItem({
                  key: '',
                  data: '}',
                  level,
                  showComma,
                  path,
                  itemsLen,
                  isClosed,
                  canClick: false
                })}
              </>
            )}
          </div>
        )
      }
      return (
        <div class={['content-wrap', props.showLine && level > 0 && 'need-border', level > 1 && 'need-indent']}>
          {renderItem({
            key,
            data,
            level,
            showComma,
            path,
            itemsLen,
            isClosed,
            canClick: false
          })}
        </div>
      )
    }

    return () => {
      return <div class="tree-node-wrap">{renderContent({ data: props.json })}</div>
    }
  }
})
