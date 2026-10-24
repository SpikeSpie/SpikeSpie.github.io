# Persona 5 Menu Web Port

Standalone browser migration of `Chavafei/Persona_5_menu_in_Godot`.

## Run locally

Serve the repository root over HTTP, then open `/persona-menu/`:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

The page uses native ES modules, WebGL, Web Audio, and the Gamepad API, so it
must be opened through HTTP instead of directly from the filesystem.

## Controls

- Arrow keys or `W` / `S`: move selection
- `Enter`, `Space`, or gamepad A: confirm
- `Escape`, `Backspace`, or gamepad B: back/open menu
- Mouse or touch: select and confirm

The source Godot project only connects the Skill button to a submenu. Item and
Equip therefore keep their original focus and confirm feedback without adding
invented screens.

## Attribution

This educational port preserves assets from the reference Godot repository and
Persona 5-related visual material. Character, logo, model, and trademark rights
remain with their respective owners.
