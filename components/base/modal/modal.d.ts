export type modalProps = {
    modalVisible: boolean,
    closeDialog: Func,
    confirm: Func,
    title: string,
    subtitle?: string,
    declineText?: string,
    confirmText: string,
    modalAnim?: 'fade' | 'none' | 'slide',
    opacityBg?:boolean
}