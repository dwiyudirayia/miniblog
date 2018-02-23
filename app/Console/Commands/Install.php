<?php

namespace App\Console\Commands;

use Symfony\Component\Process\Process;
use Symfony\Component\Filesystem\Filesystem;
use Illuminate\Console\Command;

class Install extends Command
{
    private $startTime;
    private $endTime;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'miniblog:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install miniblog';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->startTime = microtime(true);

        $fs = new Filesystem();

        $process = new Process('npm install -g yarn');
        $process->setTimeout(3600);
        $process->start();
        $this->_customProccesOutput('[1/6] Installing yarn...');
        $process->wait();

        $process = new Process('yarn');
        $process->setTimeout(3600);
        $process->start();
        $this->_customProccesOutput('[2/6] Installing node packages...');
        $process->wait();

        $this->_customProccesOutput('[3/6] Generating configuration...');
        $fs->touch(database_path('database.sqlite'));
        $fs->copy('.env.stub', '.env', true);

        $process = new Process('php artisan key:generate');
        $process->start();
        $process->wait();

        $process = new Process('php artisan migrate --force');
        $process->start();
        $this->_customProccesOutput('[4/6] Generating database...');
        $process->wait();

        $process = new Process('php artisan jwt:secret');
        $process->start();
        $this->_customProccesOutput('[5/6] Generating JWT Token...');
        $process->wait();
        
        $process = new Process('yarn prod');
        $process->setTimeout(3600);
        $process->start();
        $this->_customProccesOutput('[6/6] Building app...');
        $process->wait();

        $this->endTime = microtime(true);
        $this->_customProccesOutput('Done in '.$this->_executionTime());
    }

    private function _executionTime()
    {
        return round($this->endTime - $this->startTime, 2).'s';
    }

    private function _customProccesOutput(String $message) {
        echo (string) $message."\n";
    }

    private function _showProcessOutput(Process $process) {
        $iterator = $process->getIterator($process::ITER_SKIP_ERR | $process::ITER_KEEP_OUTPUT);
        foreach ($iterator as $data) {
            echo $data."\n";
        }
    }
}
