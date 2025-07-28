export interface NavItem {
  label: string
  icon?: string
  to?: string           
  children?: NavItem[]  
  external?: boolean    
}
