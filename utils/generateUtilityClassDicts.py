"""
Defines dictionaries that map material 3 color roles to their corresponding utility
class strings for each tailwind utility class. Used to support string interpolation
for dynamic color schemes. 
"""
import json

colorRoles = [
    "primary",
    "surface-tint",
    "on-primary",
    "primary-container",
    "on-primary-container",
    "secondary",
    "on-secondary",
    "secondary-container",
    "on-secondary-container",
    "tertiary",
    "on-tertiary",
    "tertiary-container",
    "on-tertiary-container",
    "error",
    "on-error",
    "error-container",
    "on-error-container",
    "background",
    "on-background",
    "surface",
    "on-surface",
    "surface-variant",
    "on-surface-variant",
    "outline",
    "outline-variant",
    "shadow",
    "scrim",
    "inverse-surface",
    "inverse-on-surface",
    "inverse-primary",
    "primary-fixed",
    "on-primary-fixed",
    "primary-fixed-dim",
    "on-primary-fixed-variant",
    "secondary-fixed",
    "on-secondary-fixed",
    "secondary-fixed-dim",
    "on-secondary-fixed-variant",
    "tertiary-fixed",
    "on-tertiary-fixed",
    "tertiary-fixed-dim",
    "on-tertiary-fixed-variant",
    "surface-dim",
    "surface-bright",
    "surface-container-lowest",
    "surface-container-low",
    "surface-container",
    "surface-container-high",
    "surface-container-highest"
]

utilities = [
    "bg",
    "text",
    "border",
    "outline",
    "accent",
    "fill",

]

with open('./src/M3UtilityClassesMap.ts', 'w') as file:
    file.write("import { M3ColorRole } from \"./types.js\"\n\n")
    for utility in utilities:
        file.write(f"export const {utility}UtilityClass: Record<M3ColorRole, string> = ")
        json.dump(dict(
            map(lambda role: [role, f"{utility}-{role}"], colorRoles)
        ), file)
        file.write('\n\n')


# textUtilityClass = Object.fromEntries(
#     colorRoles.map((role) => [role, `text-${role}`])
# )

# export const borderUtilityClass = Object.fromEntries(
#     colorRoles.map((role) => [role, `border-${role}`])
# )

# export const outlineUtilityClass = Object.fromEntries(
#     colorRoles.map((role) => [role, `outline-${role}`])
# )

# export const accentUtilityClass = Object.fromEntries(
#     colorRoles.map((role) => [role, `accent-${role}`])
# )

# export const fillUtilityClass = Object.fromEntries(
#     colorRoles.map((role) => [role, `fill-${role}`])
# )

# export const strokeUtilityClass = Object.fromEntries(
#     colorRoles.map((role) => [role, `stroke-${role}`])
# )

