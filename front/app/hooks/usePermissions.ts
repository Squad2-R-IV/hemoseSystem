import { useMemo } from "react";
import { 
  useGetRolesQuery, 
  useGetPermissionsQuery, 
  useGetUserToRolesQuery, 
  useGetRoleToPermissionsQuery 
} from "~/services/api";

interface PermissionStats {
  totalRoles: number;
  totalPermissions: number;
  totalUserRoles: number;
  totalRolePermissions: number;
  rolesWithMostPermissions: Array<{ name: string; count: number }>;
  permissionsByCategory: Record<string, number>;
  usersWithoutRoles: number;
  rolesWithoutPermissions: number;
}

export function usePermissionStats(): {
  stats: PermissionStats | null;
  isLoading: boolean;
  error: any;
} {
  const { data: roles, isLoading: rolesLoading, error: rolesError } = useGetRolesQuery({});
  const { data: permissions, isLoading: permissionsLoading, error: permissionsError } = useGetPermissionsQuery({});
  const { data: userRoles, isLoading: userRolesLoading, error: userRolesError } = useGetUserToRolesQuery({});
  const { data: rolePermissions, isLoading: rolePermissionsLoading, error: rolePermissionsError } = useGetRoleToPermissionsQuery({});

  const isLoading = rolesLoading || permissionsLoading || userRolesLoading || rolePermissionsLoading;
  const error = rolesError || permissionsError || userRolesError || rolePermissionsError;

  const stats = useMemo(() => {
    if (!roles || !permissions || !userRoles || !rolePermissions) {
      return null;
    }    // Função para extrair categoria das permissões
    const extractCategory = (permissionName: string): string => {
      // Se contém ':', usa a parte antes dos dois pontos
      if (permissionName.includes(':')) {
        return permissionName.split(':')[0];
      }
      
      // Se não contém ':', procura pelos padrões _action no final
      const actions = ['_create', '_read', '_update', '_delete', '_list'];
      
      for (const action of actions) {
        if (permissionName.endsWith(action)) {
          const categoryPart = permissionName.slice(0, -action.length);
          // Substitui underscores por espaços e capitaliza cada palavra
          return categoryPart
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }
      
      // Se não seguir nenhum padrão conhecido, retorna 'Outros'
      return 'Outros';
    };

    // Count permissions by category
    const permissionsByCategory = permissions.reduce((acc, permission) => {
      const category = extractCategory(permission.name);
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);// Count permissions per role
    const rolePermissionCounts = rolePermissions.reduce((acc, rp) => {
      const roleName = rp.role?.name;
      if (roleName) {
        acc[roleName] = (acc[roleName] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Get roles with most permissions
    const rolesWithMostPermissions = Object.entries(rolePermissionCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);    // Count roles without permissions
    const rolesWithPermissions = new Set(rolePermissions.map(rp => rp.role?.id).filter(Boolean));
    const rolesWithoutPermissions = roles.filter(role => !rolesWithPermissions.has(role.id)).length;

    // Count unique users with roles
    const usersWithRoles = new Set(userRoles.map(ur => ur.user?.id).filter(Boolean));

    return {
      totalRoles: roles.length,
      totalPermissions: permissions.length,
      totalUserRoles: userRoles.length,
      totalRolePermissions: rolePermissions.length,
      rolesWithMostPermissions,
      permissionsByCategory,
      usersWithoutRoles: 0, // Would need total users count to calculate this
      rolesWithoutPermissions,
    };
  }, [roles, permissions, userRoles, rolePermissions]);

  return { stats, isLoading, error };
}

export function useUserPermissions(userId: number | string) {
  const { data: userRoles, isLoading: userRolesLoading } = useGetUserToRolesQuery({});
  const { data: rolePermissions, isLoading: rolePermissionsLoading } = useGetRoleToPermissionsQuery({});

  const isLoading = userRolesLoading || rolePermissionsLoading;
  const userPermissions = useMemo(() => {
    if (!userRoles || !rolePermissions) return [];

    const userRoleIds = userRoles
      .filter(ur => ur.user?.id === String(userId))
      .map(ur => ur.role?.id)
      .filter(Boolean);

    const permissions = rolePermissions
      .filter(rp => rp.role?.id && userRoleIds.includes(rp.role.id))
      .map(rp => rp.permission)
      .filter(Boolean);

    // Remove duplicates
    const uniquePermissions = permissions.filter((permission, index, self) =>
      permission && index === self.findIndex(p => p?.id === permission.id)
    );

    return uniquePermissions;
  }, [userRoles, rolePermissions, userId]);

  return { userPermissions, isLoading };
}

export function useRolePermissions(roleId: number | string) {
  const { data: rolePermissions, isLoading } = useGetRoleToPermissionsQuery({});
  const permissions = useMemo(() => {
    if (!rolePermissions) return [];
    
    return rolePermissions
      .filter(rp => rp.role?.id === String(roleId))
      .map(rp => rp.permission)
      .filter(Boolean);
  }, [rolePermissions, roleId]);

  return { permissions, isLoading };
}

export function usePermissionHelpers() {
  const getPermissionColor = (permissionName: string) => {
    if (permissionName.includes("create")) return "success";
    if (permissionName.includes("read") || permissionName.includes("list")) return "primary";
    if (permissionName.includes("update")) return "warning";
    if (permissionName.includes("delete")) return "danger";
    return "default";
  };

  const getPermissionIcon = (permissionName: string) => {
    // Can be extended to return different icons based on permission type
    return "🔑";
  };
  const formatPermissionName = (permissionName: string) => {
    // Se contém ':', usa a lógica antiga
    if (permissionName.includes(':')) {
      const [category, action] = permissionName.split(':');
      return {
        category: category?.charAt(0).toUpperCase() + category?.slice(1) || '',
        action: action?.charAt(0).toUpperCase() + action?.slice(1) || '',
        full: permissionName,
      };
    }
    
    // Se segue o padrão novo com underscores
    const actions = ['_create', '_read', '_update', '_delete', '_list'];
    
    for (const action of actions) {
      if (permissionName.endsWith(action)) {
        const categoryPart = permissionName.slice(0, -action.length);
        const formattedCategory = categoryPart
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        const formattedAction = action.slice(1).charAt(0).toUpperCase() + action.slice(2);
        
        return {
          category: formattedCategory,
          action: formattedAction,
          full: permissionName,
        };
      }
    }
    
    // Se não seguir nenhum padrão conhecido
    return {
      category: 'Outros',
      action: permissionName,
      full: permissionName,
    };
  };
  const extractCategory = (permissionName: string): string => {
    // Se contém ':', usa a parte antes dos dois pontos
    if (permissionName.includes(':')) {
      return permissionName.split(':')[0];
    }
    
    // Se não contém ':', procura pelos padrões _action no final
    const actions = ['_create', '_read', '_update', '_delete', '_list'];
    
    for (const action of actions) {
      if (permissionName.endsWith(action)) {
        const categoryPart = permissionName.slice(0, -action.length);
        // Substitui underscores por espaços e capitaliza cada palavra
        return categoryPart
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }
    
    // Se não seguir nenhum padrão conhecido, retorna 'Outros'
    return 'Outros';
  };

  const groupPermissionsByCategory = (permissions: Array<{ name: string; [key: string]: any }>) => {
    return permissions.reduce((acc, permission) => {
      const category = extractCategory(permission.name);
      if (!acc[category]) acc[category] = [];
      acc[category].push(permission);
      return acc;
    }, {} as Record<string, typeof permissions>);
  };

  return {
    getPermissionColor,
    getPermissionIcon,
    formatPermissionName,
    groupPermissionsByCategory,
  };
}
