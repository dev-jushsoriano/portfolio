<?php

namespace App\Filament\Resources\Projects\Schemas;

use App\Models\Project;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Overview')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (Set $set, ?string $state, string $operation) {
                            if ($operation === 'create') {
                                $set('slug', Str::slug($state ?? ''));
                            }
                        }),
                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->helperText('Used in the page address, e.g. /projects/ticketing-system'),
                    Select::make('category')
                        ->required()
                        ->options([
                            'web' => 'Website',
                            'system' => 'Business System',
                            'design' => 'Design & Multimedia',
                        ]),
                    TextInput::make('client')
                        ->placeholder('e.g. LausGroup of Companies'),
                    Textarea::make('summary')
                        ->required()
                        ->maxLength(300)
                        ->rows(2)
                        ->helperText('One or two sentences shown on the project card.')
                        ->columnSpanFull(),
                ]),

            Section::make('Case study')
                ->columnSpanFull()
                ->schema([
                    Textarea::make('problem')
                        ->rows(4)
                        ->helperText('What problem did the business have before this existed?'),
                    Textarea::make('solution')
                        ->rows(4)
                        ->helperText('What did you build, and how does it work?'),
                    Textarea::make('impact')
                        ->rows(4)
                        ->helperText('What changed after launch? Use numbers where honest.'),
                    TextInput::make('users_scale')
                        ->label('Users / scale')
                        ->placeholder('e.g. 50+ departments'),
                    TagsInput::make('tech_stack')
                        ->placeholder('Type a technology and press Enter')
                        ->suggestions(['Laravel', 'PHP', 'MySQL', 'React', 'JavaScript', 'WordPress', 'REST API', 'Webhooks', 'SMS Gateway', 'Bootstrap']),
                ]),

            Section::make('Media')
                ->columnSpanFull()
                ->schema([
                    Select::make('icon')
                        ->label('Thumbnail icon')
                        ->options(Project::ICONS)
                        ->searchable()
                        ->helperText('Shown on a blue thumbnail when the project has no cover image.'),
                    FileUpload::make('cover_image')
                        ->disk('uploads')
                        ->directory('projects')
                        ->image()
                        ->imageEditor()
                        ->maxSize(4096)
                        ->helperText('Optional. Replaces the icon thumbnail. Blur or remove all real names, numbers and emails first.'),
                    FileUpload::make('gallery')
                        ->disk('uploads')
                        ->directory('projects/gallery')
                        ->image()
                        ->multiple()
                        ->reorderable()
                        ->maxFiles(8)
                        ->maxSize(4096),
                    TextInput::make('live_url')
                        ->label('Live URL')
                        ->url()
                        ->helperText('Leave empty for internal or confidential systems.'),
                ]),

            Section::make('Publishing')
                ->columns(2)
                ->columnSpanFull()
                ->schema([
                    Toggle::make('is_published')->label('Published'),
                    Toggle::make('is_featured')->label('Featured on homepage'),
                    Toggle::make('is_confidential')
                        ->label('Internal / confidential system')
                        ->helperText('Shows an "Internal system" badge instead of a link.'),
                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0)
                        ->helperText('Lower numbers appear first.'),
                ]),
        ]);
    }
}
